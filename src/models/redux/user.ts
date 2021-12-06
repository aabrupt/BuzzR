import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    [id: string]: any
}

const initialState: User = {value: {}}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.value = action.payload
        }
    }
})

export const {setUser} = userSlice.actions

export default userSlice.reducer