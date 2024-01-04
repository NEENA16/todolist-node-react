import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseNotesApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: () => ({})
});

export default baseNotesApi;
