"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
  const params = useParams();
  const pathname = usePathname();

  const routes = [
    {
      label: "Settings",
      href: `/${params.storeId}/settings`,
      isActive: pathname === `/${params.storeId}/settings`,
    },
    {
      label: "Billboards",
      href: `/${params.storeId}/billboards`,
      isActive: pathname === `/${params.storeId}/billboards`,
    },
    {
      label: "Overview",
      href: `/${params.storeId}`,
      isActive: pathname === `/${params.storeId}`,
    }
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.isActive
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
