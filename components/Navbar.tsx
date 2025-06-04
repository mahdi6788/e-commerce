import { UserButton } from "@clerk/nextjs";

import { MainNav } from "@/components/MainNav";
import StoreSwitcher from "@/components/StoreSwitcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "./ThemeToggle";

export default async function Navbar() {
  const {userId} = await auth()
  if(!userId) redirect('/sign-in')

  const stores = await prismadb.store.findMany({
    where:{userId}
  })
  
  return (
    <div className="border-b">
      <div className="flex items-center h-16 px-4">
        <div>
            <StoreSwitcher stores={stores}/>
        </div>
        <MainNav className="mx-6"/>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle/>
        <UserButton afterSwitchSessionUrl="/" />
        </div>
      </div>
    </div>
  );
}
