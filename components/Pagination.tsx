import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Info } from '@/constants/types'

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
  return (
    <TouchableOpacity
      style={[
        styles.pageNumberContainer, // استایل پایه
        number === pageNumber && { backgroundColor: 'cyan' }, // استایل شرطی
      ]}
      onPress={() => getPaginatedEpisode(number)}
    >
      {number}
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
    marginHorizontal: 3,
  },
})
