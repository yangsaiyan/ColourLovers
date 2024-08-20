import { configureStore } from "@reduxjs/toolkit";
import favorite from './favorite/favorite'

export const store = configureStore({
    reducer: {
        favorites: favorite
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch