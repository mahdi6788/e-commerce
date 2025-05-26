'use client'

import { Plus } from "lucide-react";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

export const BillboardClient = () => {
     const router = useRouter()
     const params = useParams()

     const handleNewBillboard = () => {
        router.push(`/${params.storeId}/billboards/new`)
     }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboard (0)"
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
