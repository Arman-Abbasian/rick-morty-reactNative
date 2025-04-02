import { IconSymbol } from '@/components/ui/IconSymbol'
import {
  View,
  Image,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  useGetAllEpisodesQuery,
  useLazyGetPaginatedEpisodesQuery,
} from '@/services/episode'
import Pagination from '@/components/Pagination'
import { Episode, Info } from '@/constants/types'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import useColorPalette from '@/hooks/useColorPalette'

export default function Characters() {
  const { backgroundColor, textColor, iconColor, successColor, dangerColor } =
    useColorPalette()
  const router = useRouter()

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [episodeList, setEpisodeList] = useState<Episode[] | null>(null)

  const { data: GetAllEpisodes, isLoading: GetAllEpisodesLoading } =
    useGetAllEpisodesQuery()
  const [
    LazyGetPaginatedEpisodesTrigger,
    {
      data: LazyGetPaginatedEpisodes,
      isLoading: LazyGetPaginatedEpisodesLoading,
    },
  ] = useLazyGetPaginatedEpisodesQuery()

  const getPaginatedEpisodeHandler = async (number: number) => {
    try {
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.set('page', number.toString())
      window.history.pushState({}, '', newUrl.toString())
      setPageNumber(number)
      const data = await LazyGetPaginatedEpisodesTrigger(number)
      setEpisodeList(data?.data?.results as Episode[])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={episodeList ? episodeList : GetAllEpisodes?.results}
        keyExtractor={(item) => item.id.toString()}
        style={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router.push(`/episode/${item.id}`)
            }}
            style={[styles.itemContainer, { backgroundColor: backgroundColor }]}
          >
            <View style={{ flex: 1 }}>
              <Image
                source={require('../../assets/images/episode.png')}
                style={styles.episodeImage}
                resizeMode="contain"
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
                <IconSymbol size={20} name="tv" color={iconColor} />
                <Text style={[styles.text, { color: textColor }]}>
                  {item.episode}
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
                <IconSymbol size={20} name="calendar" color={iconColor} />
                <Text style={[styles.text, { color: textColor }]}>
                  {item.air_date}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      {GetAllEpisodes?.info && (
        <View style={styles.paginationStyle}>
          <Pagination
            info={GetAllEpisodes?.info as Info}
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
    width: '100%',
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
    height: '100%',
    borderRadius: 5,
    flex: 2,
    width: '40%',
  },
  textContainer: {
    display: 'flex',
    width: '50%',
    flex: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  episodeImage: {
    width: '100%',
    marginRight: 10,
  },
  paginationStyle: {
    alignItems: 'center',
  },
})
