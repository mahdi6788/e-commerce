import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { CategoriesColumnsType } from "@/components/CategoriesColumns";
import { CategoryClient } from "@/components/CategoryClient";

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;

  const categories = await prismadb.category.findMany({
    where: {
      storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedCategories: CategoriesColumnsType[] = categories.map(
    (category) => ({
      id: category.id,
      name: category.name,
      billboardLabel: category.billboard.label,
      createdAt: format(category.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient categories={formatedCategories} />
      </div>
    </div>
  );
}
