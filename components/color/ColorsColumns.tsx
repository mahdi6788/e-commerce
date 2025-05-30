"use client";
import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "@/components/color/cell-action-color";

export type ColorsColumnsType = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const ColorsColumns: ColumnDef<ColorsColumnsType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.value }}
        />
      </div>
    ),
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
