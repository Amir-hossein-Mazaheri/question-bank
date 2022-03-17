import { createSlice } from "@reduxjs/toolkit";

const filters = createSlice({
  name: "filters",
  initialState: {
    subject: [],
    hardness: "all", // all for no filter 1 for easy 2 for medium 3 for hard
    searchQuery: "",
    filteredQuestions: [],
  },
  reducers: {
    SET_HARDNESS: (store, action) => {
      store.hardness = action.payload.hardness;
    },
    SET_SUBJECT: (store, action) => {
      store.subject = action.payload.subjectIds;
    },
    SET_SEARCH_QUERY: (store, action) => {
      store.searchQuery = action.payload.query;
    },
    SET_FILTERED_QUESTIONS: (store, action) => {
      store.filteredQuestions = action.payload.questions;
    },
  },
});

export default filters.reducer;

export const {
  SET_SORT,
  SET_HARDNESS,
  SET_SUBJECT,
  SET_SEARCH_QUERY,
  SET_FILTERED_QUESTIONS,
} = filters.actions;
