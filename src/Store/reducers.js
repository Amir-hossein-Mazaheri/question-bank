import { combineReducers } from "@reduxjs/toolkit";
import entitiesReducers from "./entities/entitiesReducers";
import uiReducer from "./ui";

const reducers = combineReducers({
  // ui: uiReducer,
  entities: entitiesReducers,
});

export default reducers;
