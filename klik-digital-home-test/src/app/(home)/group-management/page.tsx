"use client";

import { columnGroupManagement } from "@/components/layouts/columns/column-group-management";
import DataTable from "@/components/layouts/tables";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGroupListsQuery,
  useNewGroupMutation,
} from "@/stores/features/group-management-features/api";
import { GroupManagementInterface } from "@/stores/features/group-management-features/interface";
import { ApiResponse, DataObject } from "@/types";
import { Loader, Plus, X } from "lucide-react";
import { useState } from "react";

export default function GroupManagementPage() {
  const [name, setName] = useState<string>("");
  const { data, refetch } = useGroupListsQuery();
  const lists = data?.data;

  const [newGroup, { isLoading, reset }] = useNewGroupMutation();

  const postNewGroup = async () => {
    try {
      const response: ApiResponse<DataObject<GroupManagementInterface>> =
        await newGroup({
          group_management_name: name,
        }).unwrap();

      if (response.status === "success") {
        reset();
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="pl-6 md:pl-24 pr-6 pb-16">
      <div className="w-full flex flex-col gap-y-4 md:gap-y-8">
        <div className="w-full flex flex-row justify-between items-center border-b border-neutral-400 py-5">
          <p className="font-semibold text-[14px]">Data Group Management</p>

          <p className="text-[12px] text-neutral-400">Data Group Management</p>
        </div>

        <div className="w-full flex flex-row justify-end">
          <div className="w-full flex flex-row justify-end gap-x-3 px-3">
            <AlertDialog>
              <AlertDialogTrigger className="w-2/12 md:w-[25%] lg:w-[15%] flex flex-row justify-center items-center gap-x-1 bg-blue-400 p-3 rounded-md">
                <div className="w-6 h-6 flex items-center justify-center rounded-full">
                  <Plus className="rounded-full w-5 h-5 text-white" />
                </div>

                <p className="hidden md:text-[14px] md:font-medium text-white">
                  Create New
                </p>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white rounded-md w-10/12 max-w-[600px] flex flex-col py-4">
                <div className="w-full flex flex-row items-center justify-end px-3">
                  <AlertDialogCancel className="border-none mt-0 shadow-none py-0 px-0">
                    <X className="w-5 h-5 text-primary-40 hover:text-primary-50" />
                  </AlertDialogCancel>
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-y-2">
                  <AlertDialogTitle className="font-semibold text-[20px]">
                    Create New
                  </AlertDialogTitle>

                  <AlertDialogDescription className="text-center">
                    Group Management
                  </AlertDialogDescription>
                </div>

                <form
                  onSubmit={postNewGroup}
                  className="w-full flex flex-col gap-y-3 md:gap-y-8">
                  <AlertDialogHeader className="w-full flex flex-col gap-y-5 px-3">
                    <div className="w-full flex flex-col gap-y-2">
                      <Label className="text-start md:text-center">
                        Name
                        <span className="text-error-30 text-[12px]">*</span>
                      </Label>

                      <Input
                        type="text"
                        name="group_management_name"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setName(e.target.value)
                        }
                        placeholder="Nama Group Management"
                        className="w-full border border-neutral-60 rounded-md placeholder:opacity-25 active:border active:border-blue-400 focus:border focus:border-blue-400"
                      />
                    </div>
                  </AlertDialogHeader>

                  <AlertDialogFooter className="w-full flex flex-col md:flex-row gap-y-3 md:items-center justify-between p-3">
                    <div className="w-full md:w-4/12 flex flex-row justify-end">
                      <Button
                        disabled={isLoading}
                        type="submit"
                        className="bg-blue-400 hover:bg-blue-500 text-white w-full">
                        {isLoading ? (
                          <Loader className="animate-spin" />
                        ) : (
                          "Simpan"
                        )}
                      </Button>
                    </div>
                  </AlertDialogFooter>
                </form>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-4 md:gap-y-8">
          <div className="w-full">
            {lists && (
              <DataTable
                data={lists}
                columns={columnGroupManagement(refetch)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
