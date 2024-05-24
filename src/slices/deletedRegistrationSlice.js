import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:  ""
}

const deletedRegistrationSlice = createSlice({
    name: "deletedRegistration",
    initialState: initialState,
    reducers: {
        setDeletedRegistration: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setDeletedRegistration} = deletedRegistrationSlice.actions;

export default deletedRegistrationSlice.reducer;