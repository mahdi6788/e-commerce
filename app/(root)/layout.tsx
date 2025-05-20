import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });
  /// check if there is a store for this userId, user will be redirected to its dashboard related to the store
  if (store) {
    redirect(`/${store.id}`);
  }

  /// if the there is not any store in database for this userId, the user is shown modal offering build a new store. The modal is located in the page as children
  return <>{children}</>;
}
