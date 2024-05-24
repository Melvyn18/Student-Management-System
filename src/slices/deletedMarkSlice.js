import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:  ""
}

const deletedMarkSlice = createSlice({
    name: "deletedMark",
    initialState: initialState,
    reducers: {
        setDeletedMark: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setDeletedMark} = deletedMarkSlice.actions;

export default deletedMarkSlice.reducer;