import { apiSlice } from "@/stores/instance/instance";
import { ApiResponse, DataArray, DataObject } from "@/types";
import { ManagementInterface } from "./interface";

export const managementApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    managementLists: builder.query<
      ApiResponse<DataArray<ManagementInterface>>,
      void
    >({
      query: () => ({
        url: `/management`,
        method: "GET",
        meta: {
          useAuthorization: true,
          contentType: "application/json",
        },
      }),
    }),
    newManagement: builder.mutation<
      ApiResponse<DataObject<ManagementInterface>>,
      {
        management_name: string;
        group_id: number;
      }
    >({
      query: (data: { management_name: string; group_id: number }) => ({
        url: `/management`,
        method: "POST",
        body: data,
        meta: {
          useAuthorization: true,
          contentType: "application/json",
        },
      }),
    }),
    deleteManagement: builder.mutation<ApiResponse<DataObject<string>>, number>(
      {
        query: (id: number) => ({
          url: `/management/${id}`,
          method: "DELETE",
          meta: {
            useAuthorization: true,
            contentType: "application/json",
          },
        }),
      }
    ),
  }),
});

// useRegisterMutation
export const {
  useManagementListsQuery,
  useNewManagementMutation,
  useDeleteManagementMutation,
} = managementApi;
