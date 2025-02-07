import { StyleSheet, ImageBackground } from 'react-native'

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require('../../assets/images/wallpaper.jpg')}
      style={styles.background}
      resizeMode="cover"
    ></ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20,
    backgroundPosition: 'center',
  },
})
