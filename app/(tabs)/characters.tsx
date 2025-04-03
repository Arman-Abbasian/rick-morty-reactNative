import { IconSymbol } from '@/components/ui/IconSymbol'
import {
  useGetAllCharactersQuery,
  useLazyGetPaginatedCharactersQuery,
} from '@/services/character'
import {
  View,
  Image,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import Pagination from '@/components/Pagination'
import { useEffect, useState } from 'react'
import { Character, Info } from '@/constants/types'
import useColorPalette from '@/hooks/useColorPalette'
import Spinner from '@/components/ui/Spinner'

export default function Characters() {
  const { backgroundColor, textColor, iconColor, successColor, dangerColor } =
    useColorPalette()

  const router = useRouter()

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
      setPageNumber(number)
      const data = await LazyGetPaginatedCharactersTrigger(number).unwrap()
      setCharacterList(data?.results as Character[])
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      {GetAllCharactersLoading ? (
        <Spinner size="large" />
      ) : (
        <FlatList
          data={
            characterList?.length
              ? characterList
              : GetAllCharacters?.results || []
          }
          keyExtractor={(item) => String(item.id)}
          style={styles.listContainer}
          nestedScrollEnabled={true}
          ListEmptyComponent={
            <Text style={{ color: 'red' }}>No Data Found</Text>
          }
          renderItem={({ item }) => {
            console.log('Rendering item:', item)
            return (
              <TouchableOpacity
                onPress={() => {
                  router.push(`/character/${item.id}`)
                }}
                style={[styles.itemContainer, { backgroundColor }]}
              >
                <View style={{ flex: 1, height: '100%' }}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>

                <View style={styles.textContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 3,
                      marginBottom: 8,
                    }}
                  >
                    <IconSymbol size={20} name="person" color={iconColor} />
                    <Text style={[styles.text, { color: textColor }]}>
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
                    <IconSymbol size={20} name="folder" color={iconColor} />
                    <Text style={[styles.text, { color: textColor }]}>
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
                    <IconSymbol size={20} name="person" color={iconColor} />
                    <Text style={[styles.text, { color: textColor }]}>
                      {item.gender}
                    </Text>
                  </View>

                  <IconSymbol
                    size={15}
                    name="circle"
                    color={item.status === 'Alive' ? successColor : dangerColor}
                  />
                </View>
              </TouchableOpacity>
            )
          }}
        />
      )}
      {GetAllCharacters?.info && (
        <View style={styles.paginationStyle}>
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
    flexDirection: 'row', // قرار دادن آیتم‌ها کنار هم
    alignItems: 'center', // تراز عمودی آیتم‌ها
    justifyContent: 'flex-start', // شروع آیتم‌ها از سمت چپ
    padding: 8,
    borderRadius: 5,
    height: 120,
    marginBottom: 10,
    backgroundColor: '#f9f9f9', // رنگ پس‌زمینه برای تست ظاهر
    gap: 10, // فاصله بین آیتم‌ها
  },
  image: {
    width: '100%',
    marginRight: 10,
    height: '100%',
    borderRadius: 5,
  },
  textContainer: {
    display: 'flex',
    width: '50%',
    flex: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  paginationStyle: {
    alignItems: 'center',
  },
})
