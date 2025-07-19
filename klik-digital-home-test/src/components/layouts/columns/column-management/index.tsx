"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { SortDesc } from "lucide-react";
import { ManagementInterface } from "@/stores/features/management-features/interface";
import ActionCellManagement from "../../action-cell-management";

export const columnManagement = (
  refetch: () => void
): ColumnDef<ManagementInterface>[] => [
  {
    accessorKey: "no",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          No
          <SortDesc className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.index + 1}</div>,
  },
  {
    accessorKey: "management_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <SortDesc className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.management_name || "-";
    },
  },
  {
    accessorKey: "group_management_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name Group
          <SortDesc className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.group_management_name || "-";
    },
  },
  {
    id: "actions",
    enableHiding: false,
    // header: "Action",
    cell: ({ row }) => (
      <ActionCellManagement data={row.original} refetch={refetch} />
    ),
  },
];
