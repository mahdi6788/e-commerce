import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    if (!productId) {
      return new NextResponse("product is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("product_GET: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ productId: string; storeId: string }> }
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

    const { productId, storeId } = await params;
    if (!productId || !storeId) {
      return new NextResponse("product ID nad store ID are required", {
        status: 400,
      });
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

    await prismadb.product.update({
      where: {
        id: productId,
      },
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
          deleteMany: {},
        },
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("product_PATCH: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ productId: string; storeId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { productId, storeId } = await params;
    if (!productId) {
      return new NextResponse("product ID is required", { status: 400 });
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

    await prismadb.product.deleteMany({
      where: {
        id: productId,
        storeId,
      },
    });

    return NextResponse.json("product Deleted", { status: 200 });
  } catch (error) {
    console.log("product_DELETE: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
