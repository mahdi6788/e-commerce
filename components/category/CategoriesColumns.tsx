"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "@/components/category/cell-action-category";

export type CategoriesColumnsType = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const CategoriesColumns: ColumnDef<CategoriesColumnsType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header:"Billboard",
    cell:({row}) => row.original.billboardLabel
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
