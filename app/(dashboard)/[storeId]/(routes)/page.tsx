import prismadb from "@/lib/prismadb";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {

  const {storeId} = await params

  const store = await prismadb?.store.findFirst({
    where: {
      id: storeId,
    },
  });
  return (
  <div>
    Active Store: {store?.name}
  </div>
  );
}
