import { View, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { Info } from '@/constants/types'

type PageNumberProps = {
  number: number // Define 'number' as a prop of type 'number'
}

export default function Pagination(props: Info) {
  const { count, pages } = props
  return <View></View>
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
  pageNumberContainer: {
    width: 10,
    height: 10,
    borderRadius: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
