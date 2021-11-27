import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    username: string
    name: string
    lastname: string
    email: string
    friends: Array<string>
    _id: string
}

const initialState: User | {} = {}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state = action.payload
        }
    }
})

export const {setUser} = userSlice.actions

export default userSlice.reducer