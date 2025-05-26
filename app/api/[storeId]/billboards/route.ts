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

    const { label, imageUrl } = await req.json();
    if (!label || !imageUrl) {
      return new NextResponse("imageUrl and Label are required.", {
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

    const billboard = await prismadb.billboard.create({
      data: {
        storeId,
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARD_POST: ", error);
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

    const billboard = await prismadb.billboard.findMany({
      where: {
        storeId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARD_GET: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
