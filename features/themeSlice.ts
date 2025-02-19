import { createSlice } from '@reduxjs/toolkit'
import { Appearance } from 'react-native'

const systemTheme = Appearance.getColorScheme()
const initialState = {
  theme: systemTheme || 'light',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
