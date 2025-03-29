import { IconSymbol } from '@/components/ui/IconSymbol'
import {
  useGetAllCharactersQuery,
  useLazyGetPaginatedCharactersQuery,
} from '@/services/character'
import { View, Image, FlatList, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Link } from 'expo-router'
import Pagination from '@/components/Pagination'
import { useState } from 'react'
import { Character, Info } from '@/constants/types'

const themeColors = {
  light: {
    backgroundColor: '#CBD5E1', // Light mode background color
    textColor: '#334155', // Light mode text color
  },
  dark: {
    backgroundColor: '#334155', // Dark mode background color
    textColor: '#F1F5F9', // Dark mode text color
  },
}

export default function Characters() {
  const theme = useSelector((state: RootState) => state.theme.theme)

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [characterList, setCharacterList] = useState<Character[] | null>(null)

  const { data: GetAllCharacters, isLoading: GetAllCharactersLoading } =
    useGetAllCharactersQuery()
  const [
    LazyGetPaginatedCharactersTrigger,
    {
      data: LazyGetPaginatedCharacters,
      isLoading: LazyGetPaginatedCharactersLoading,
    },
  ] = useLazyGetPaginatedCharactersQuery()
  const getPaginatedEpisodeHandler = async (number: number) => {
    try {
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.set('page', number.toString())
      window.history.pushState({}, '', newUrl.toString())
      setPageNumber(number)
      const data = await LazyGetPaginatedCharactersTrigger(number)
      setCharacterList(data?.data?.results as Character[])
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={characterList ? characterList : GetAllCharacters?.results}
        keyExtractor={(item) => item.id.toString()}
        style={styles.listContainer}
        renderItem={({ item }) => (
          <Link
            href={`/character/${item.id}`}
            style={[
              styles.itemContainer,
              { backgroundColor: themeColors[theme].backgroundColor },
            ]}
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.textContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 3,
                  marginBottom: 8,
                }}
              >
                <IconSymbol
                  size={20}
                  name="person"
                  color={themeColors[theme].textColor}
                />
                <Text
                  style={[styles.text, { color: themeColors[theme].textColor }]}
                >
                  {item.name}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 3,
                  marginBottom: 8,
                }}
              >
                <IconSymbol
                  size={20}
                  name="category"
                  color={themeColors[theme].textColor}
                />
                <Text
                  style={[styles.text, { color: themeColors[theme].textColor }]}
                >
                  {item.species}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 3,
                  marginBottom: 8,
                }}
              >
                <IconSymbol
                  size={20}
                  name="transgender"
                  color={themeColors[theme].textColor}
                />
                <Text
                  style={[styles.text, { color: themeColors[theme].textColor }]}
                >
                  {item.gender}
                </Text>
              </View>

              <IconSymbol
                size={20}
                name="circle"
                color={item.status === 'Alive' ? 'green' : 'red'}
              />
            </View>
          </Link>
        )}
      />
      {GetAllCharacters?.info && (
        <View>
          <Pagination
            info={GetAllCharacters?.info as Info}
            getPaginatedEpisode={getPaginatedEpisodeHandler}
            pageNumber={pageNumber}
          />
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 5,
    height: 130,
    marginBottom: 10,
    gap: 10,
  },
  image: {
    height: '100%',
    borderRadius: 5,
    flex: 2,
    width: '40%',
  },
  textContainer: {
    display: 'flex',
    width: '50%',
    flex: 3,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
})
