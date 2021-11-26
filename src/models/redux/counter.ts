import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '@lib/redux-store'

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
        reset: (state) => {
            state.value = 0
        }
    },
})

export const {increment, decrement, incrementByAmount, reset} = counterSlice.actions

export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer