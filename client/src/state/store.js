import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { faqApi } from "./faq/faqApi";
import { servicesApi } from "./services/serviceApi";

export const store = configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [faqApi.reducerPath]: faqApi.reducer,
      [servicesApi.reducerPath]: servicesApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(faqApi.middleware)
      .concat(servicesApi.middleware)
  })
  
  // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
  setupListeners(store.dispatch)

