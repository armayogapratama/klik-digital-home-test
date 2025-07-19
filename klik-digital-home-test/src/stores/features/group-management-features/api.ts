import { apiSlice } from "@/stores/instance/instance";
import { ApiResponse, DataArray, DataObject } from "@/types";
import { GroupManagementInterface } from "./interface";

export const groupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    groupLists: builder.query<
      ApiResponse<DataArray<GroupManagementInterface>>,
      void
    >({
      query: () => ({
        url: `/group-management`,
        method: "GET",
        meta: {
          useAuthorization: true,
          contentType: "application/json",
        },
      }),
    }),
    newGroup: builder.mutation<
      ApiResponse<DataObject<GroupManagementInterface>>,
      {
        group_management_name: string;
      }
    >({
      query: (data: { group_management_name: string }) => ({
        url: `/group-management`,
        method: "POST",
        body: data,
        meta: {
          useAuthorization: true,
          contentType: "application/json",
        },
      }),
    }),
    deleteGroup: builder.mutation<ApiResponse<DataObject<string>>, number>({
      query: (id: number) => ({
        url: `/group-management/${id}`,
        method: "DELETE",
        meta: {
          useAuthorization: true,
          contentType: "application/json",
        },
      }),
    }),
  }),
});

// useRegisterMutation
export const {
  useGroupListsQuery,
  useNewGroupMutation,
  useDeleteGroupMutation,
} = groupApi;
