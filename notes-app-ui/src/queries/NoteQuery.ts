import apiSlice from '../core/baseApi';

const notesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotes: builder.query({
      query: () => `/api/notes`
    }),
    createNote: builder.mutation({
      query: (body) => ({ url: '/api/notes', method: 'POST', body })
    }),
    deleteNote: builder.mutation({
      query: (id) => ({ url: `/api/notes/${id}`, method: 'DELETE' })
    }),
    updateNote: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/notes/${id}`,
        method: 'PUT',
        body
      })
    }),
    searchNote: builder.query({
      query: (searchTerm) => `/api/notes/search?title=${searchTerm}`
    })
  })
});

export const {
  useGetAllNotesQuery,
  useLazyGetAllNotesQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
  useLazySearchNoteQuery
} = notesApi;
