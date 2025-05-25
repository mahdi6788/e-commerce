import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import SettingsForm from "@/components/SettingsForm";

export default async function SettingsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const stores = await prismadb.store.findFirst({
    where: {
      userId,
      id: params.storeId,
    },
  });

  if (!stores) redirect("/");

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={stores} />
      </div>
    </div>
  );
}
