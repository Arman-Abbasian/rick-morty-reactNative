import React, { useEffect, useMemo } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useGetCharacterQuery } from '@/services/character'
import { useGetMultipleEpisodesQuery } from '@/services/episode'
import { useNavigation } from '@react-navigation/native'
import Spinner from '@/components/ui/Spinner'

export default function CharacterDetail() {
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()
  const router = useRouter()
  // Fetch character details
  const { data: GetCharacter, isLoading } = useGetCharacterQuery(Number(id))

  // Extract episode IDs using useMemo (prevents unnecessary re-renders)
  const episodes = useMemo(() => {
    const ids = GetCharacter?.episode
      ?.map((url: string) => url.split('/').pop())
      .filter(Boolean) // حذف `undefined`ها
      .join(',') // تبدیل آرایه به رشته جداشده با `,`

    return ids || undefined // اگر مقدار خالی بود، `undefined` برگردان
  }, [GetCharacter])

  // تغییر عنوان صفحه بعد از دریافت داده
  useEffect(() => {
    if (GetCharacter?.name) {
      navigation.setOptions({ title: `Name: ${GetCharacter.name}` }) // تنظیم عنوان صفحه
    }
  }, [GetCharacter, navigation])
  // Fetch multiple episodes only if episodes are available
  const {
    data: GetMultipleEpisodes = [],
    isLoading: GetMultipleEpisodesLoading,
  } = useGetMultipleEpisodesQuery(episodes, {
    skip: !episodes,
  })

  const episodeList = () => {
    if (Array.isArray(GetMultipleEpisodes)) return GetMultipleEpisodes
    return [GetMultipleEpisodes]
  }

  if (isLoading) return <Spinner color="blue" size="large" />

  return (
    <View style={styles.container}>
      <Image source={{ uri: GetCharacter?.image }} style={styles.image} />
      <Text style={styles.name}>{GetCharacter?.name}</Text>
      <Text style={styles.detail}>
        Species:{' '}
        <span style={{ fontWeight: 'bold' }}>{GetCharacter?.species}</span>
      </Text>
      <Text style={styles.detail}>
        Gender:{' '}
        <span style={{ fontWeight: 'bold' }}>{GetCharacter?.gender}</span>
      </Text>
      <Text style={styles.detail}>
        Status:{' '}
        <span style={{ fontWeight: 'bold' }}>{GetCharacter?.status}</span>
      </Text>

      {/* Episodes Section with Wrapping and Scrollable Container */}
      {GetMultipleEpisodesLoading ? (
        <Spinner color="blue" size="large" />
      ) : (
        <View style={{ flex: 1, paddingTop: 30, width: '100%' }}>
          <Text style={{ textAlign: 'center', marginBottom: 20 }}>
            Episodes Featuring This Character
          </Text>
          <ScrollView
            style={{ flex: 1, width: '100%' }} // اضافه کردن flex: 1 برای پر کردن ارتفاع باقی‌مانده
            contentContainerStyle={[styles.episodesContainer, { flexGrow: 1 }]}
          >
            {episodeList().map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  router.push(`/episode/${item.id}`)
                }}
                style={styles.episodeCard}
              >
                <Text style={styles.episodeText}>{item.episode}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}
export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Episode ${params.id}`,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginBottom: 5,
  },
  episodesContainer: {
    flexDirection: 'row', // Items arranged in row direction
    flexWrap: 'wrap', // Allow wrapping of items
    justifyContent: 'center', // Align items to start
  },
  episodeCard: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100, // Fixed width for each card
    height: 50, // Fixed height for each card
  },
  episodeText: {
    fontSize: 14,
    textAlign: 'center',
  },
})
