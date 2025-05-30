import { format } from "date-fns";

import { BillboardsColumnsType } from "@/components/BillboardsColumns";
import { BillboardClient } from "@/components/BillboardClient";
import prismadb from "@/lib/prismadb";

export default async function BillboardsPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedBillboards: BillboardsColumnsType[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient billboards={formatedBillboards} />
      </div>
    </div>
  );
}
