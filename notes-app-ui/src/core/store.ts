import { configureStore } from '@reduxjs/toolkit';
import baseNotesApi from './baseApi';

export default configureStore({
  reducer: {
    [baseNotesApi.reducerPath]: baseNotesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseNotesApi.middleware)
});
