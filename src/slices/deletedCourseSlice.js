import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:  ""
}

const deletedStudentSlice = createSlice({
    name: "deletedCourse",
    initialState: initialState,
    reducers: {
        setDeletedCourse: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {setDeletedCourse} = deletedCourseSlice.actions;

export default deletedCourseSlice.reducer;