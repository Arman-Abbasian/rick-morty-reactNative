import { useGetAllCharactersQuery } from '@/services/characters'
import { View } from 'react-native'

export default function TabTwoScreen() {
  const { data: GetAllCharacters } = useGetAllCharactersQuery()
  console.log(GetAllCharacters?.results)
  return <View>explore</View>
}
