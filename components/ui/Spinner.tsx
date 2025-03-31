import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

export default function Spinner({ size = 'large', color = '#3498db' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // پس‌زمینه‌ی نیمه شفاف
  },
})
