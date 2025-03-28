import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const characterApiSlice = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  //Read
  endpoints: (builder) => ({
    GetAllCharacters: builder.query({
      query: () => 'character',
    }),
    GetMultipleCharacters: builder.query({
      query: (episodes) => `episode/${episodes}`,
    }),
    GetCharacter: builder.query({
      query: (id) => `character/${id}`,
    }),
  }),
})

export const {
  useGetAllCharactersQuery,
  useGetMultipleCharactersQuery,
  useGetCharacterQuery,
} = characterApiSlice
