"use client";

import { Plus } from "lucide-react";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";

export const BillboardClient = ({
  billboards,
}: {
  billboards: Billboard[];
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
    </>
  );
};
