import { configureStore } from '@reduxjs/toolkit'
import { characterApiSlice } from './services/characters'
import themeReducer from './features/themeSlice'
export const store = configureStore({
  reducer: {
    // Add your reducers here
    //sync
    theme: themeReducer,
    //Async
    [characterApiSlice.reducerPath]: characterApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(characterApiSlice.middleware),
})
