import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const episodeApiSlice = createApi({
  reducerPath: 'episodeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  //Read
  endpoints: (builder) => ({
    GetMultipleEpisodes: builder.query({
      query: (episodes) => `episode/${episodes}`,
    }),
  }),
})

export const { useGetMultipleEpisodesQuery } = episodeApiSlice
