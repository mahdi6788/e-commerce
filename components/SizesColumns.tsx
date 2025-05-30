"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "@/components/cell-action-size";

export type SizesColumnsType = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const SizesColumns: ColumnDef<SizesColumnsType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
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
