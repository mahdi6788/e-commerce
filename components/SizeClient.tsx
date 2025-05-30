"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { SizesColumns, SizesColumnsType } from "@/components/SizesColumns";
import { Separator } from "@/components/ui/Separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/api-list";

export const SizeClient = ({
  sizes,
}: {
  sizes: SizesColumnsType[];
}) => {
  const router = useRouter();
  const params = useParams();

  const handleNewSize = () => {
    router.push(`/${params.storeId}/sizes/new`);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Size (${sizes.length})`}
          description="Manage sizes for your product"
        />
        <Button onClick={handleNewSize}>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={SizesColumns} data={sizes} />
      <Heading title="API" description="API calls for Sizes"/>
      <Separator/>
      <ApiList entityName="sizes" entityIdName="sizeId"/>
    </>
  );
};
