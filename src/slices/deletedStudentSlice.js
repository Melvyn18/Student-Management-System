import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:  ""
}

const deletedStudentSlice = createSlice({
    name: "deletedStudent",
    initialState: initialState,
    reducers: {
        setDeletedStudent: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setDeletedStudent} = deletedStudentSlice.actions;

export default deletedStudentSlice.reducer;