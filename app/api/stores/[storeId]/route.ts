import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { name } = await req.json();
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const storeId = params.storeId;
    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        userId,
        id: storeId,
      },
      data: { name },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("STORE_PATCH: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const storeId = params.storeId;
    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const store = await prismadb.store.delete({
      where: {
        userId,
        id: storeId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("STORE_DELETE: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
