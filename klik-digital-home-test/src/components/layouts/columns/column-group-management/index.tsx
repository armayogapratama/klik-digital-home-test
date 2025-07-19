"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { SortDesc } from "lucide-react";
import { GroupManagementInterface } from "@/stores/features/group-management-features/interface";
import ActionCellGroup from "../../action-cell-group";

export const columnGroupManagement = (
  refetch: () => void
): ColumnDef<GroupManagementInterface>[] => [
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
    accessorKey: "group_management_name",
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
      return row.original.group_management_name || "-";
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <ActionCellGroup data={row.original} refetch={refetch} />
    ),
  },
];
