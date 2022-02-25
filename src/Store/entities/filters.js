import { createSlice } from "@reduxjs/toolkit";

const filters = createSlice({
  name: "filters",
  initialState: {
    sortBy: "all",
    GLS: {
      // gls stands for Grade Lesson Season
      grade: "",
      lesson: "",
      season: "",
    },
    hardness: "2", // 1 for easy 2 for medium 3 for hard
  },
  reducers: {
    SET_SORT: (store, action) => {
      store.sortBy = action.payload.sortType;
    },
    SET_HARDNESS: (store, action) => {
      store.hardness = action.payload.hardness;
    },
    SET_GRADE: (store, action) => {
      store.GLS.grade = action.payload.grade;
    },
    SET_LESSON: (store, action) => {
      store.GLS.lesson = action.payload.lesson;
    },
    SET_SEASON: (store, action) => {
      store.GLS.season = action.payload.season;
    },
  },
});

export default filters.reducer;

export const { SET_SORT, SET_HARDNESS, SET_GRADE, SET_LESSON, SET_SEASON } =
  filters.actions;
