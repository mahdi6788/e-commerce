import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { ProductsColumnsType } from "@/components/product/ProductsColumns";
import { ProductClient } from "@/components/product/ProductClient";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;

  const products = await prismadb.product.findMany({
    where: {
      storeId,
    },
    include:{
      category: true,
      size: true,
      color: true
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedProducts: ProductsColumnsType[] = products.map(
    (product) => ({
      id: product.id,
      name: product.name,
      isFeatured: product.isFeatured,
      isArchived: product.isArchived,
      price: formatter.format(product.price.toNumber()),
      category: product.category.name,
      size: product.size.name,
      color:product.color.value,
      createdAt: format(product.createdAt, "MMMM do, yyyy"),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient products={formatedProducts} />
      </div>
    </div>
  );
}
