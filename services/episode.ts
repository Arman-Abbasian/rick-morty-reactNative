import { EpisodeResponse } from '@/constants/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const episodeApiSlice = createApi({
  reducerPath: 'episodeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  //Read
  endpoints: (builder) => ({
    GetAllEpisodes: builder.query<EpisodeResponse, void>({
      query: () => `episode`,
    }),
    GetMultipleEpisodes: builder.query({
      query: (episodes) => `episode/${episodes}`,
    }),
  }),
})

export const { useGetAllEpisodesQuery, useGetMultipleEpisodesQuery } =
  episodeApiSlice
