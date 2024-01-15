import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL });

export const servicesApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "services",
  tagTypes: ["Service", "Services"],
  endpoints: (builder) => ({
    getService: builder.query({
      query: (id) => `/api/services/view/${id}`,
      providesTags: ["Service"],
    }),
    getAllServices: builder.query({
      query: () => "/api/services/view-all",
      invalidatesTags: ["Services"],
    }),
    createService: builder.mutation({
      query: (newService) => ({
        url: "/api/services/create",
        method: "POST",
        body: newService,
      }),
      invalidatesTags: [{ type: "Service", id: "LIST" }],
      // Add your onQueryStarted, onQueryCompleted, onError functions as needed
    }),
    updateService: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/api/services/update/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: [{ type: "Service", id: "LIST" }],
      // Add your onQueryStarted, onQueryCompleted, onError functions as needed
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/api/services/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Service", id: "LIST" }],
      // Add your onQueryStarted, onQueryCompleted, onError functions as needed
    }),
    // Additional endpoints can be added here if needed
  }),
});

export const {
  useGetServiceQuery,
  useGetAllServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
