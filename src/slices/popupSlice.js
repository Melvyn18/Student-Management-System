import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:  false
}

const popupSlice = createSlice({
    name: "popup",
    initialState: initialState,
    reducers: {
        setPopup: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setPopup} = popupSlice.actions;

export default popupSlice.reducer;