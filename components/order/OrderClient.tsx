"use client";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/Separator";
import { DataTable } from "@/components/ui/data-table";
import {
  OrdersColumns,
  OrdersColumnsType,
} from "@/components/order/OrdersColumns";


export const OrderClient = ({ orders }: { orders: OrdersColumnsType[] }) => {
  return (
    <>
      <Heading
        title={`Orders(${orders.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable searchKey="products" columns={OrdersColumns} data={orders} />
    </>
  );
};
