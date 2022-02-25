import { combineReducers } from "@reduxjs/toolkit";
import filterReducer from "./filters";
import questionReducer from "./question";

const entitiesReducers = combineReducers({
  filters: filterReducer,
  question: questionReducer,
});

export default entitiesReducers;
