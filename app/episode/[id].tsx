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
import Spinner from '@/components/ui/Spinner'
import useColorPalette from '@/hooks/useColorPalette'

export default function CharacterDetail() {
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()
  const router = useRouter()

  const { backgroundColor, textColor, iconColor } = useColorPalette()

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

  if (GetEpisodeLoading) return <Spinner size="large" />

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/episode.png')}
        style={[styles.image, { backgroundColor }]}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={[styles.name, { color: textColor }]}>
          {GetEpisode?.episode}
        </Text>
        <Text style={[styles.detail, { color: textColor }]}>
          name:{' '}
          <Text style={{ fontWeight: 'bold', color: textColor }}>
            {GetEpisode?.name}
          </Text>
        </Text>
        <Text style={[styles.detail, { marginBottom: 20, color: textColor }]}>
          air date:{' '}
          <Text style={{ fontWeight: 'bold', color: textColor }}>
            {GetEpisode?.air_date}
          </Text>
        </Text>
      </View>

      {/* بخش کاراکترها با ScrollView */}
      <View style={styles.flexContainer}>
        {GetMultipleCharactersLoading ? (
          <Spinner size="large" />
        ) : (
          <ScrollView contentContainerStyle={styles.characterContainer}>
            {characterList().map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  router.push(`/character/${item.id}`)
                }}
                style={[styles.characterCard, { backgroundColor }]}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.characterImage}
                  resizeMode="cover"
                />
                <Text style={[styles.characterText, { color: textColor }]}>
                  {item.name}
                </Text>
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
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
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
  },
  characterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    // Shadow for iOS
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow direction
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius

    // Shadow for Android
    elevation: 5, // Elevation for Android
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
