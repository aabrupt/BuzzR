import { configureStore } from "@reduxjs/toolkit"
import user from '@models/redux/user'
import userLoaded from "@models/redux/userLoaded"

export const store = configureStore({
    reducer: {
        user,
        userLoaded,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch