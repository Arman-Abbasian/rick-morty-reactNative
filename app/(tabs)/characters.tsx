import { IconSymbol } from '@/components/ui/IconSymbol'
import { useGetAllCharactersQuery } from '@/services/characters'
import { View, Image, FlatList, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const themeColors = {
  light: {
    backgroundColor: '#ffffff', // Light mode background color
    textColor: '#000000', // Light mode text color
  },
  dark: {
    backgroundColor: '#121212', // Dark mode background color
    textColor: '#ffffff', // Dark mode text color
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
          <View
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
                <IconSymbol size={20} name="person" color="black" />
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
                <IconSymbol size={20} name="category" color="black" />
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
                <IconSymbol size={20} name="transgender" color="black" />
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
          </View>
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
  },
  textContainer: {
    display: 'flex',

    flex: 3,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
})
