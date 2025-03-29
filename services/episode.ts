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
    GetMultipleEpisodes: builder.query<EpisodeResponse, void>({
      query: (episodes) => `episode/${episodes}`,
    }),
    GetPaginatedEpisodes: builder.query<EpisodeResponse, number>({
      query: (page: number) => `episode?page=${page}`,
    }),
  }),
})

export const {
  useGetAllEpisodesQuery,
  useGetMultipleEpisodesQuery,
  useLazyGetPaginatedEpisodesQuery,
} = episodeApiSlice
