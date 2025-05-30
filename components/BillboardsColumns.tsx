"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "@/components/cell-action"


export type BillboardsColumnsType = {
  id: string
  label: string
  createdAt: string
}

export const BillboardsColumns: ColumnDef<BillboardsColumnsType>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell:({row}) => <CellAction data={row.original}/>
  }
]
