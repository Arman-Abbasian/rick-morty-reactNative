import { View, StyleSheet, FlatList } from 'react-native'
import { Link } from 'expo-router'
import { Info } from '@/constants/types'

type PaginationProps = {
  info: Info // Define 'number' as a prop of type 'number'
}
type PageNumberProps = {
  number: number // Define 'number' as a prop of type 'number'
}

export default function Pagination(props: PaginationProps) {
  const { info } = props

  return (
    <View style={styles.paginationContainer}>
      <FlatList
        data={Array.from({ length: info.pages }, (_, i) => i + 1)}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <PageNumber number={item} />}
        horizontal={true}
        style={styles.paginationContainer}
      />
    </View>
  )
}

function PageNumber(props: PageNumberProps) {
  const { number } = props
  return (
    <View style={styles.pageNumberContainer}>
      <Link href={`https://rickandmortyapi.com/api/episode?page=${number}`}>
        {number}
      </Link>
    </View>
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
