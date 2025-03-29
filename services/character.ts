import { CharacterResponse } from '@/constants/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const characterApiSlice = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  //Read
  endpoints: (builder) => ({
    GetAllCharacters: builder.query<CharacterResponse, void>({
      query: () => 'character',
    }),
    GetMultipleCharacters: builder.query<CharacterResponse, void>({
      query: (episodes) => `episode/${episodes}`,
    }),
    GetCharacter: builder.query<CharacterResponse, number>({
      query: (id) => `character/${id}`,
    }),
    GetPaginatedCharacters: builder.query<CharacterResponse, number>({
      query: (page: number) => `character?page=${page}`,
    }),
  }),
})

export const {
  useGetAllCharactersQuery,
  useGetMultipleCharactersQuery,
  useGetCharacterQuery,
  useLazyGetPaginatedCharactersQuery,
} = characterApiSlice
