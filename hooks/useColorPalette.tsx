import { useThemeColor } from './useThemeColor'

const useColorPalette = () => {
  const backgroundColor = useThemeColor({}, 'background')
  const textColor = useThemeColor({}, 'text')
  const iconColor = useThemeColor({}, 'icon')
  const successColor = useThemeColor({}, 'success')
  const dangerColor = useThemeColor({}, 'danger')
  const tintColor = useThemeColor({}, 'tint')
  const tabIconDefaultColor = useThemeColor({}, 'tabIconDefault')
  const tabIconSelectedColor = useThemeColor({}, 'tabIconSelected')
  return {
    backgroundColor,
    textColor,
    iconColor,
    successColor,
    dangerColor,
    tintColor,
    tabIconDefaultColor,
    tabIconSelectedColor,
  }
}
export default useColorPalette
