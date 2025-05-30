import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { SizesColumnsType } from "@/components/SizesColumns";
import { SizeClient } from "@/components/SizeClient";

export default async function SizesPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;

  const sizes = await prismadb.size.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedSizes: SizesColumnsType[] = sizes.map(
    (size) => ({
      id: size.id,
      name: size.name,
      value:size.value,
      createdAt: format(size.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient sizes={formatedSizes} />
      </div>
    </div>
  );
}
