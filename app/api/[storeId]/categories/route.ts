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

    const { name, billboardId } = await req.json();
    if (!name || !billboardId) {
      return new NextResponse("billboardId and name are required.", {
        status: 400,
      });
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

    const category = await prismadb.category.create({
      data: {
        storeId,
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY_POST: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { storeId } = await params;
    if (!storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const categories = await prismadb.category.findMany({
      where: {
        storeId,
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.log("CATEGORIES_GET: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
