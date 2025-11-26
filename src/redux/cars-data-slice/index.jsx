import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: null
}

const carsDataSlice = createSlice({
    name: "carsdata",
    initialState,
    reducers: {
        setData: (state, { payload }) => {
            state.data = payload
        },
        editData: (state, payload) => {

        }
    }
})

export const { setData, editData } = carsDataSlice.actions
export default carsDataSlice.reducer