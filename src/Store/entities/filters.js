import { createSlice } from "@reduxjs/toolkit";

const filters = createSlice({
  name: "filters",
  initialState: {
    sortBy: "all",
    subject: "",
    hardness: "all", // all for no filter 1 for easy 2 for medium 3 for hard
    searchQuery: "",
  },
  reducers: {
    SET_SORT: (store, action) => {
      store.sortBy = action.payload.sortType;
    },
    SET_HARDNESS: (store, action) => {
      store.hardness = action.payload.hardness;
    },
    SET_SUBJECT: (store, action) => {
      store.subject = action.payload.subjectIds;
    },
    SET_SEARCH_QUERY: (store, action) => {
      store.searchQuery = action.payload.query;
    },
  },
});

export default filters.reducer;

export const { SET_SORT, SET_HARDNESS, SET_SUBJECT, SET_SEARCH_QUERY } =
  filters.actions;
