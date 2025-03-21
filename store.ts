import { configureStore } from '@reduxjs/toolkit'
import { characterApiSlice } from './services/character'
import { episodeApiSlice } from './services/episode'
import themeReducer from './features/themeSlice'

// پیکربندی استور
export const store = configureStore({
  reducer: {
    // ریدوسرهای همگام
    theme: themeReducer,

    // ریدوسرهای ناهمگام مربوط به API‌ها
    [characterApiSlice.reducerPath]: characterApiSlice.reducer,
    [episodeApiSlice.reducerPath]: episodeApiSlice.reducer, // اضافه کردن reducer مربوط به episodeApiSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(characterApiSlice.middleware)
      .concat(episodeApiSlice.middleware), // اضافه کردن middleware برای هماهنگی با API
})

// تعریف انواع استور
export type RootState = ReturnType<typeof store.getState> // نوع وضعیت اصلی
export type AppDispatch = typeof store.dispatch // نوع dispatch
