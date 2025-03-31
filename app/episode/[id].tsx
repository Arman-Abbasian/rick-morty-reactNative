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
import { useGetEpisodeQuery } from '@/services/episode'
import { useGetMultipleCharactersQuery } from '@/services/character'
import { useNavigation } from '@react-navigation/native'

export default function CharacterDetail() {
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()
  const router = useRouter()

  // Fetch character details
  const { data: GetEpisode, isLoading: GetEpisodeLoading } = useGetEpisodeQuery(
    Number(id)
  )

  // تغییر عنوان صفحه بعد از دریافت داده
  useEffect(() => {
    if (GetEpisode?.name) {
      navigation.setOptions({ title: `Episode: ${GetEpisode.episode}` })
    }
  }, [GetEpisode, navigation])

  const characters = useMemo(() => {
    return GetEpisode?.characters
      ?.map((url: string) => url.split('/').pop())
      .filter(Boolean) // حذف undefined‌ها
      .join(',') // تبدیل آرایه به یک رشته با ','
  }, [GetEpisode])

  // دریافت اطلاعات کاراکترها
  const {
    data: GetMultipleCharacters = [],
    isLoading: GetMultipleCharactersLoading,
  } = useGetMultipleCharactersQuery(characters, {
    skip: !characters,
  })

  const characterList = () => {
    if (Array.isArray(GetMultipleCharacters)) return GetMultipleCharacters
    return [GetMultipleCharacters]
  }

  if (GetEpisodeLoading) return <Text>Loading...</Text>

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/episode.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{GetEpisode?.episode}</Text>
      <Text style={styles.detail}>
        name: <Text style={{ fontWeight: 'bold' }}>{GetEpisode?.name}</Text>
      </Text>
      <Text style={styles.detail}>
        air date:{' '}
        <Text style={{ fontWeight: 'bold' }}>{GetEpisode?.air_date}</Text>
      </Text>

      {/* بخش کاراکترها با ScrollView */}
      <View style={styles.flexContainer}>
        {GetMultipleCharactersLoading ? (
          <Text>Loading Characters...</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.characterContainer}>
            {characterList().map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  router.push(`/character/${item.id}`)
                }}
                style={styles.characterCard}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.characterImage}
                  resizeMode="cover"
                />
                <Text style={styles.characterText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  )
}

export const meta = {
  title: 'Episode Details',
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
    backgroundColor: 'white',
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
  flexContainer: {
    flex: 1,
    width: '100%',
  },
  characterContainer: {
    flexGrow: 1,
    padding: 10,
  },
  characterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    margin: 5,
  },
  characterText: {
    fontSize: 14,
    textAlign: 'center',
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
})
