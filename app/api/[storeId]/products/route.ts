import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const {
      name,
      images,
      price,
      categoryId,
      colorId,
      sizeId,
      isFeatured,
      isArchived,
    } = await req.json();
    if (!name) {
      return new NextResponse("name are required.", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("images are required.", { status: 400 });
    }
    if (!price) {
      return new NextResponse("price are required.", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("categoryId are required.", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("colorId are required.", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("sizeId are required.", { status: 400 });
    }

    const { storeId } = await params;
    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prismadb.product.create({
      data: {
        storeId,
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
        images: {
          createMany: {
            data: [
              ...images.map((image:{url:string}) => image)
            ]
          }
        }
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("product_POST: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const {searchParams} = new URL(req.url)
    const categoryId = searchParams.get("categoryId") || undefined
    const colorId = searchParams.get("colorId") || undefined
    const sizeId = searchParams.get("sizeId") || undefined
    const isFeatured = searchParams.get("isFeatured")

    const { storeId } = await params;
    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false
      },
      include:{
        images:true,
        category:true,
        color:true,
        size:true
      },
      orderBy:{
        createdAt: "desc"
      }
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log("products_GET: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
