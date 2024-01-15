import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL });

export const faqApi = createApi({
  baseQuery: baseQuery,
  reducerPath: "faq",
  tagTypes: ["FAQ", "FAQs"],
  endpoints: (builder) => ({
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
    // Additional endpoints can be added here if needed
  }),
});

export const {
  useGetFAQQuery,
  useGetAllFAQsQuery,
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} = faqApi;
