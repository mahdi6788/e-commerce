import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ billboardId: string }> }
) {
  try {
    const { billboardId } = await params;
    if (!billboardId) {
      return new NextResponse("Billboard is required", { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARD_GET: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ billboardId: string; storeId: string }> }
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

    const { billboardId, storeId } = await params;
    if (!billboardId || !storeId) {
      return new NextResponse("billboard ID nad store ID are required", {
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

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: billboardId,
        storeId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARD_PATCH: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ billboardId: string; storeId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { billboardId, storeId } = await params;
    if (!billboardId) {
      return new NextResponse("billboard ID is required", { status: 400 });
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

    await prismadb.billboard.deleteMany({
      where: {
        id: billboardId,
        storeId,
      },
    });

    return NextResponse.json("Billboard Deleted", { status: 200 });
  } catch (error) {
    console.log("BILLBOARD_DELETE: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
