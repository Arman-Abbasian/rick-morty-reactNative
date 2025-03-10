import { IconSymbol } from '@/components/ui/IconSymbol'
import { useGetAllCharactersQuery } from '@/services/characters'
import { View, Image, FlatList, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Link } from 'expo-router'

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

  const { data: GetAllCharacters, isLoading: GetAllCharactersLoading } =
    useGetAllCharactersQuery({})

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={GetAllCharacters?.results}
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
