import { format } from "date-fns";
import prismadb from "@/lib/prismadb";

import { formatter } from "@/lib/utils";
import { OrdersColumnsType } from "@/components/order/OrdersColumns";
import { OrderClient } from "@/components/order/OrderClient";

export default async function OrdersPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = await params;

  const orders = await prismadb.order.findMany({
    where: {
      storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedOrders: OrdersColumnsType[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    products: order.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      order.orderItems.reduce(
        (total, item) => total + Number(item.product.price), 0 )),
    isPaid: order.isPaid,
    createdAt: format(order.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient orders={formatedOrders} />
      </div>
    </div>
  );
}
