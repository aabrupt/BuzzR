import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    username: string
    name: string
    lastname: string
    email: string
    contacts: Array<string>
    dob: Date
    logs: { 
        last_login: Date
        last_password_reset: Date
        last_activity: Date  
    }
    states: {
        online: boolean
        available: boolean
    }
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