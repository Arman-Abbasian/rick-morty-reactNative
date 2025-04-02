import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native'
import { Info } from '@/constants/types'
import useColorPalette from '@/hooks/useColorPalette'

type PaginationProps = {
  info: Info
  getPaginatedEpisode: (number: number) => void
  pageNumber: number
}
type PageNumberProps = {
  number: number
  getPaginatedEpisode: (number: number) => void
  pageNumber: number
}

export default function Pagination(props: PaginationProps) {
  const { info, getPaginatedEpisode, pageNumber } = props
  const { tintColor } = useColorPalette()

  return (
    <View style={styles.paginationContainer}>
      <FlatList
        data={Array.from(
          { length: info.pages > 5 ? 5 : info.pages },
          (_, i) => i + 1
        )}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <PageNumber
            number={item}
            getPaginatedEpisode={getPaginatedEpisode}
            pageNumber={pageNumber}
          />
        )}
        horizontal={true}
        style={styles.paginationContainer}
      />
    </View>
  )
}

function PageNumber(props: PageNumberProps) {
  const { number, getPaginatedEpisode, pageNumber } = props
  const { tintColor, textColor } = useColorPalette()
  return (
    <TouchableOpacity
      style={[
        styles.pageNumberContainer,
        { borderColor: textColor }, // استایل پایه
        number === pageNumber && { backgroundColor: tintColor }, // استایل شرطی
      ]}
      onPress={() => getPaginatedEpisode(number)}
    >
      <Text style={{ color: textColor }}>{number}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  paginationContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  pageNumberContainer: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
})
