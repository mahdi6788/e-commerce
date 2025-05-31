"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import {
  BillboardsColumns,
  BillboardsColumnsType,
} from "@/components/billboard/BillboardsColumns";
import { Separator } from "@/components/ui/Separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/api-list";

export const BillboardClient = ({
  billboards,
}: {
  billboards: BillboardsColumnsType[];
}) => {
  const router = useRouter();
  const params = useParams();

  const handleNewBillboard = () => {
    router.push(`/${params.storeId}/billboards/new`);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboard (${billboards.length})`}
          description="Manage billboards for your store"
        />
        <Button onClick={handleNewBillboard}>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="label"
        columns={BillboardsColumns}
        data={billboards}
      />
      <Heading title="API" description="API calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};
