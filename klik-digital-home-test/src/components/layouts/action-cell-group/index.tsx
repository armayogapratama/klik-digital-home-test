"use client";

import { useDeleteGroupMutation } from "@/stores/features/group-management-features/api";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GroupManagementInterface } from "@/stores/features/group-management-features/interface";

const ActionCellGroup = ({
  data,
  refetch,
}: {
  data: GroupManagementInterface;
  refetch: () => void;
}) => {
  const [deleteGroup] = useDeleteGroupMutation();

  const handleDeleteGroup = async (id: number) => {
    try {
      const response = await deleteGroup(id).unwrap();

      if (response.status === "success") {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          <span className="sr-only">Open menu</span>
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white z-10 shadow-sm">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleDeleteGroup(data.id)}
          className="cursor-pointer"
          asChild>
          <p className="text-red-500 text-[16px]">Delete</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionCellGroup;
