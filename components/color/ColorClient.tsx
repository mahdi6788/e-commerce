"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/Separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/api-list";
import { ColorsColumns, ColorsColumnsType } from "@/components/color/ColorsColumns";

export const ColorClient = ({
  colors,
}: {
  colors: ColorsColumnsType[];
}) => {
  const router = useRouter();
  const params = useParams();

  const handleNewColor = () => {
    router.push(`/${params.storeId}/colors/new`);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Color (${colors.length})`}
          description="Manage colors for your product"
        />
        <Button onClick={handleNewColor}>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={ColorsColumns} data={colors} />
      <Heading title="API" description="API calls for colors"/>
      <Separator/>
      <ApiList entityName="colors" entityIdName="colorId"/>
    </>
  );
};
