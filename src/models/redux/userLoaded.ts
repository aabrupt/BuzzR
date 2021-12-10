import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {value: boolean} = {value: false}

export const userLoadedSlice = createSlice({
    name: "userLoaded",
    initialState,
    reducers: {
        setLoaded: (state) => {
            state.value = true
        }
    }
})

export const {setLoaded} = userLoadedSlice.actions

export default userLoadedSlice.reducer