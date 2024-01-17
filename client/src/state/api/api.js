import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL });

export const Api = createApi({
  baseQuery: baseQuery,
  reducerPath: "Api",
  tagTypes: ["FAQ", "FAQs","Service", "Services"],
  endpoints: (builder) => ({
    // Faq endpoints
    getFAQ: builder.query({
      query: (id) => `/api/faqs/view/${id}`,
      providesTags: ["FAQ"],
    }),
    getAllFAQs: builder.query({
      query: () => "/api/faqs/view-all",
      invalidatesTags: ["FAQs"],
    }),
    createFAQ: builder.mutation({
      query: (newFAQ) => ({
        url: "/api/faqs/create",
        method: "POST",
        body: newFAQ,
      }),
      invalidatesTags: [{ type: "FAQ", id: "LIST" }],
      // Add your onQueryStarted, onQueryCompleted, onError functions as needed
    }),
    updateFAQ: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/api/faqs/update/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: [{ type: "FAQ", id: "LIST" }],
      // Add your onQueryStarted, onQueryCompleted, onError functions as needed
    }),
    deleteFAQ: builder.mutation({
      query: (id) => ({
        url: `/api/faqs/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "FAQ", id: "LIST" }],
      // Add your onQueryStarted, onQueryCompleted, onError functions as needed
    }),
    // services endpoints
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
  }),
});

export const {
  useGetFAQQuery,
  useGetAllFAQsQuery,
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
  useGetServiceQuery,
  useGetAllServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = Api;
