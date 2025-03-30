import React, { useEffect, useMemo } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useGetEpisodeQuery } from '@/services/episode'
import { useGetMultipleCharactersQuery } from '@/services/character'
import { useNavigation } from '@react-navigation/native'

export default function CharacterDetail() {
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()

  // Fetch character details
  const { data: GetEpisode, isLoading: GetEpisodeLoading } = useGetEpisodeQuery(
    Number(id)
  )
  // تغییر عنوان صفحه بعد از دریافت داده
  useEffect(() => {
    if (GetEpisode?.name) {
      navigation.setOptions({ title: `Episode: ${GetEpisode.episode}` }) // تنظیم عنوان صفحه
    }
  }, [GetEpisode, navigation])

  // Extract episode IDs using useMemo (prevents unnecessary re-renders)
  const characters = useMemo(() => {
    return (
      GetEpisode?.characters?.map((url: string) => url.split('/').pop()) || []
    )
  }, [GetEpisode])

  // Fetch multiple episodes only if episodes are available
  const {
    data: GetMultipleCharacters = [],
    isLoading: GetMultipleCharactersLoading,
  } = useGetMultipleCharactersQuery(characters, {
    skip: characters.length === 0,
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
      />
      <Text style={styles.name}>{GetEpisode?.episode}</Text>
      <Text style={styles.detail}>
        name: <span style={{ fontWeight: 'bold' }}>{GetEpisode?.name}</span>
      </Text>
      <Text style={styles.detail}>
        air date:{' '}
        <span style={{ fontWeight: 'bold' }}>{GetEpisode?.air_date}</span>
      </Text>

      {/* Episodes Section with Wrapping and Scrollable Container */}
      {GetMultipleCharactersLoading ? (
        <Text>Loading Episodes...</Text>
      ) : (
        <View style={{ paddingTop: 30, width: '100%' }}>
          <Text style={{ textAlign: 'center' }}>Episode Characters</Text>
          <ScrollView contentContainerStyle={styles.episodesContainer}>
            {characterList().map((item, index) => (
              <View key={index} style={styles.episodeCard}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.characterImage}
                  resizeMode="cover"
                />

                <Text style={styles.episodeText}>{item.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}
export const meta = {
  title: 'Episode Details', // تغییر عنوان صفحه
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
    padding: 10,
    maxHeight: 300, // Define a fixed height for the container
    width: '100%',
  },
  episodeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    margin: 5,
  },
  episodeText: {
    fontSize: 14,
    textAlign: 'center',
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
})
