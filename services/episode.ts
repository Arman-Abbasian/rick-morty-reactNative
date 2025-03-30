import { Episode, EpisodeResponse } from '@/constants/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const episodeApiSlice = createApi({
  reducerPath: 'episodeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  //Read
  endpoints: (builder) => ({
    GetAllEpisodes: builder.query<EpisodeResponse, void>({
      query: () => `episode`,
    }),
    GetEpisode: builder.query<Episode, number>({
      query: (id: number) => `episode/${id}`,
    }),
    GetMultipleEpisodes: builder.query<Episode[], void>({
      query: (episodes) => `episode/${episodes}`,
    }),
    GetPaginatedEpisodes: builder.query<EpisodeResponse, number>({
      query: (page: number) => `episode?page=${page}`,
    }),
  }),
})

export const {
  useGetAllEpisodesQuery,
  useGetEpisodeQuery,
  useGetMultipleEpisodesQuery,
  useLazyGetPaginatedEpisodesQuery,
} = episodeApiSlice
