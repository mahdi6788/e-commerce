"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/Separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/api-list";
import {
  ProductsColumns,
  ProductsColumnsType,
} from "@/components/product/ProductsColumns";

export const ProductClient = ({
  products,
}: {
  products: ProductsColumnsType[];
}) => {
  const router = useRouter();
  const params = useParams();

  const handleNewProduct = () => {
    router.push(`/${params.storeId}/products/new`);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Product (${products.length})`}
          description="Manage products for your store"
        />
        <Button onClick={handleNewProduct}>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={ProductsColumns} data={products} />
      <Heading title="API" description="API calls for Products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};
