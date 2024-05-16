import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:  ""
}

const userSlice = createSlice({
    name: "username",
    initialState: initialState,
    reducers: {
        change: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {change} = userSlice.actions;

export default userSlice.reducer;