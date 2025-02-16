import { useGetAllCharactersQuery } from '@/services/characters'
import { View, Image, FlatList, Text, StyleSheet } from 'react-native'

export default function TabTwoScreen() {
  const { data: GetAllCharacters, isLoading: GetAllCharactersLoading } =
    useGetAllCharactersQuery({})

  return (
    <FlatList
      data={GetAllCharacters?.results}
      keyExtractor={(item) => item.id.toString()}
      style={styles.listContainer}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.species}</Text>
            <Text style={styles.text}>{item.gender}</Text>
          </View>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'lime',
    padding: 8,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  textContainer: {
    display: 'flex',
    gap: '8px',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
})
