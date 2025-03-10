import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useGetCharacterQuery } from '@/services/characters' // Import your query hook

export default function CharacterDetail() {
  const { id } = useLocalSearchParams()

  const { data: GetCharacter, isLoading } = useGetCharacterQuery(id) // Fetch character details

  if (isLoading) return <Text>Loading...</Text>

  return (
    <View style={styles.container}>
      <Image source={{ uri: GetCharacter?.image }} style={styles.image} />
      <Text style={styles.name}>{GetCharacter?.name}</Text>
      <Text style={styles.detail}>Species: {GetCharacter?.species}</Text>
      <Text style={styles.detail}>Gender: {GetCharacter?.gender}</Text>
      <Text style={styles.detail}>Status: {GetCharacter?.status}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
})
