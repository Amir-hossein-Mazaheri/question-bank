import { combineReducers } from "@reduxjs/toolkit";
import filterReducer from "./filters";

const entitiesReducers = combineReducers({
  filters: filterReducer,
});

export default entitiesReducers;
