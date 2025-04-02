import useColorPalette from '@/hooks/useColorPalette'
import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

interface SpinnerProps {
  size?: 'small' | 'large' // مشخص کردن فقط مقادیر مجاز برای سایز
  color?: string
}

export default function Spinner({
  size = 'large',
  color = '#3498db',
}: SpinnerProps) {
  const { textColor } = useColorPalette()
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={textColor} />
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
