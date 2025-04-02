/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#2dd4bf' //teal-400
const tintColorDark = '#5eead4' //teal-300

export const Colors = {
  light: {
    background: '#e2e8f0', //slate-200
    text: '#134e4a', //teal-900
    tint: tintColorLight,
    icon: '#0d9488', //teal-600,
    success: '#10b981', //emerald-500
    danger: '#f43f5e', //rose-500
    tabIconDefault: '#0d9488', //teal-600
    tabIconSelected: tintColorLight,
  },

  dark: {
    background: '#020617', //slate-950
    text: '#2dd4bf', //teal-400
    tint: tintColorDark,
    icon: '#5eead4', //teal-300
    success: '#10b981', //emerald-500
    danger: '#f43f5e', //rose-500
    tabIconDefault: '#5eead4', //teal-300
    tabIconSelected: tintColorDark,
  },
}
