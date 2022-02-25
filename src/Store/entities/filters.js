import { createSlice } from "@reduxjs/toolkit";

const filters = createSlice({
  name: "filters",
  initialState: {
    sortBy: "all",
    SGLS: {
      // SGLS stands for Grade Lesson Season
      major: "",
      grade: "",
      course: "",
      subject: "",
    },
    hardness: "all", //all for no filter 1 for easy 2 for medium 3 for hard
  },
  reducers: {
    SET_SORT: (store, action) => {
      store.sortBy = action.payload.sortType;
    },
    SET_HARDNESS: (store, action) => {
      store.hardness = action.payload.hardness;
    },
    SET_SUBJECT: (store, action) => {
      store.SGLS.subject = action.payload.subject;
    },
  },
});

export default filters.reducer;

export const { SET_SORT, SET_HARDNESS, SET_SUBJECT } =
  filters.actions;
