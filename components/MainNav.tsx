"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
  const params = useParams();
  const pathname = usePathname();

  const routes = [
    {
      label: "Overview",
      href: `/${params.storeId}`,
      isActive: pathname === `/${params.storeId}`,
    },
    {
      label: "Orders",
      href: `/${params.storeId}/orders`,
      isActive: pathname === `/${params.storeId}/orders`,
    },
    {
      label: "Products",
      href: `/${params.storeId}/products`,
      isActive: pathname === `/${params.storeId}/products`,
    },
    {
      label: "Billboards",
      href: `/${params.storeId}/billboards`,
      isActive: pathname === `/${params.storeId}/billboards`,
    },
    {
      label: "Categories",
      href: `/${params.storeId}/categories`,
      isActive: pathname === `/${params.storeId}/categories`,
    },
    {
      label: "Sizes",
      href: `/${params.storeId}/sizes`,
      isActive: pathname === `/${params.storeId}/sizes`,
    },
    {
      label: "Colors",
      href: `/${params.storeId}/colors`,
      isActive: pathname === `/${params.storeId}/colors`,
    },
    {
      label: "Settings",
      href: `/${params.storeId}/settings`,
      isActive: pathname === `/${params.storeId}/settings`,
    },
    
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
