"use client";

import { columnManagement } from "@/components/layouts/columns/column-management";
import DataTable from "@/components/layouts/tables";
import { useGroupListsQuery } from "@/stores/features/group-management-features/api";
import {
  useManagementListsQuery,
  useNewManagementMutation,
} from "@/stores/features/management-features/api";
import { ManagementInterface } from "@/stores/features/management-features/interface";
import { ApiResponse, DataObject } from "@/types";
import { useState } from "react";
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
import { Loader, Plus, X } from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GroupManagementInterface } from "@/stores/features/group-management-features/interface";

export default function ManagementPage() {
  const [management, setManagement] = useState({
    management_name: "",
    group_id: "",
  });
  const { data, refetch } = useManagementListsQuery();
  const lists = data?.data;
  const { data: groups } = useGroupListsQuery();
  const groupLists = groups?.data;

  const [newManagement, { isLoading, reset }] = useNewManagementMutation();

  const postNewManagement = async () => {
    try {
      const dataSend = {
        ...management,
        group_id: Number(management.group_id),
      };

      const response: ApiResponse<DataObject<ManagementInterface>> =
        await newManagement(dataSend).unwrap();

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
      <div className="w-full flex flex-col gap-y-8">
        <div className="w-full flex flex-row justify-between items-center border-b border-neutral-400 py-5">
          <p className="font-semibold text-[14px]">Data Management</p>

          <p className="text-[12px] text-neutral-400">Data Management</p>
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
                    Management
                  </AlertDialogDescription>
                </div>

                <form
                  onSubmit={postNewManagement}
                  className="w-full flex flex-col gap-y-3 md:gap-y-8">
                  <AlertDialogHeader className="w-full flex flex-col gap-y-5 px-3">
                    <div className="w-full flex flex-col gap-y-2">
                      <Label className="text-start md:text-start text-[14px]">
                        Name
                        <span className="text-error-30 text-[12px]">*</span>
                      </Label>

                      <Input
                        type="text"
                        name="management_name"
                        value={management?.management_name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setManagement({
                            ...management,
                            management_name: e.target.value,
                          })
                        }
                        placeholder="Nama Management"
                        className="w-full border border-neutral-60 rounded-md placeholder:opacity-25 active:border active:border-blue-400 focus:border focus:border-blue-400"
                      />
                    </div>

                    <div className="w-full flex flex-col gap-y-2">
                      <Label className="text-start md:text-start text-[14px]">
                        Nama Group
                        <span className="text-error-30 text-[12px]">*</span>
                      </Label>

                      <Select
                        value={management.group_id}
                        onValueChange={(value: string) => {
                          setManagement({
                            ...management,
                            group_id: value,
                          });
                        }}>
                        <SelectTrigger className="w-full px-3 border border-neutral-60 rounded-md">
                          <SelectValue placeholder="Pilih Nama Bank" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <div className="max-h-[300px] overflow-y-auto">
                            {groupLists && groupLists.length > 0 ? (
                              groupLists.map(
                                (
                                  grup: GroupManagementInterface,
                                  index: number
                                ) => (
                                  <SelectItem
                                    key={index}
                                    value={grup?.id.toString()}>
                                    {grup?.group_management_name}
                                  </SelectItem>
                                )
                              )
                            ) : (
                              <p className="p-2 text-sm text-neutral-500">
                                Group Management Kosong
                              </p>
                            )}
                          </div>
                        </SelectContent>
                      </Select>
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

        <div className="w-full flex flex-col gap-y-8">
          <div className="w-full">
            {lists && (
              <DataTable data={lists} columns={columnManagement(refetch)} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
