import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { ColorClient } from "@/components/ColorClient";
import { ColorsColumnsType } from "@/components/ColorsColumns";

export default async function ColorsPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;

  const colors = await prismadb.color.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedColors: ColorsColumnsType[] = colors.map(
    (color) => ({
      id: color.id,
      name: color.name,
      value:color.value,
      createdAt: format(color.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient colors={formatedColors} />
      </div>
    </div>
  );
}
