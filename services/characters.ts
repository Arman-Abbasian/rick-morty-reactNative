import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const characterApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  //Read
  endpoints: (builder) => ({
    GetAllCharacters: builder.query({
      query: () => 'character',
    }),
  }),
})

export const { useGetAllCharactersQuery } = characterApiSlice
