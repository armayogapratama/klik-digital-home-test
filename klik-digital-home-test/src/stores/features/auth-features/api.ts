import { apiSlice } from "@/stores/instance/instance";
import { ApiResponse, DataObject } from "@/types";
import { LoginInterface } from "./interface";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      ApiResponse<DataObject<LoginInterface>>,
      { username: string; password: string }
    >({
      query: (data: { username: string; password: string }) => ({
        url: `/login`,
        method: "POST",
        body: data,
        meta: {
          useAuthorization: false,
          contentType: "application/json",
        },
      }),
    }),
  }),
});

// useRegisterMutation
export const { useLoginMutation } = authApi;
