import { createSlice } from "@reduxjs/toolkit";

const filters = createSlice({
  name: "filters",
  initialState: {
    subject: "",
    hardness: "", // all for no filter 1 for easy 2 for medium 3 for hard
    searchQuery: "",
    urlParams: {},
    forceToUpdate: "",
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
    SET_URL_PARAMS: (store, action) => {
      store.urlParams = action.payload.params;
    },
    FORCE_TO_UPDATE: (store) => {
      store.forceToUpdate = new Date().toISOString();
    },
  },
});

export default filters.reducer;

export const {
  SET_SORT,
  SET_HARDNESS,
  SET_SUBJECT,
  SET_SEARCH_QUERY,
  SET_URL_PARAMS,
  FORCE_TO_UPDATE,
} = filters.actions;
