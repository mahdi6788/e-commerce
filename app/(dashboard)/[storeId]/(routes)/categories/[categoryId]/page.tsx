import CategoryForm from "@/components/CategoryForm";
import prismadb from "@/lib/prismadb";

export default async function NewCategory({
  params,
}: {
  params: Promise<{ categoryId: string, storeId: string }>;
}) {

  const {categoryId, storeId} = await params

  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
}
