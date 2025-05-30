"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/Separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/api-list";
import { CategoriesColumns, CategoriesColumnsType } from "./CategoriesColumns";

export const CategoryClient = ({
  categories,
}: {
  categories: CategoriesColumnsType[];
}) => {
  const router = useRouter();
  const params = useParams();

  const handleNewCategory = () => {
    router.push(`/${params.storeId}/categories/new`);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Category (${categories.length})`}
          description="Manage Categories for your store"
        />
        <Button onClick={handleNewCategory}>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={CategoriesColumns} data={categories} />
      <Heading title="API" description="API calls for Catgories"/>
      <Separator/>
      <ApiList entityName="categories" entityIdName="categoryId"/>
    </>
  );
};
