export type Episode = {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}
type Location = {
  name: string
  url: string
}

export type Character = {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  origin: Location
  location: Location
  image: string
  episode: string[]
  url: string
  created: string
}

export type Info = {
  count: number // Total number of episodes
  pages: number // Total number of pages
  next: string | null // Link to the next page, or null if there's no next page
  prev: string | null // Link to the previous page, or null if there's no previous page
}

export type EpisodeResponse = {
  info: Info // Information about pagination
  results: Episode[] // Array of episodes
}
