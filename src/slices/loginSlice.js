import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:  false
}

const loginSlice = createSlice({
    name: "isLoggedIn",
    initialState: initialState,
    reducers: {
        setLoginStatus: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setLoginStatus} = loginSlice.actions;

export default loginSlice.reducer;