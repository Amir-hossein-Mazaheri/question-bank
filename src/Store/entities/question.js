import { createSlice } from "@reduxjs/toolkit";

const initialCategories = {
  major: "",
  grade: "",
  course: "",
  subject: "",
};

const initialQuestion = {
  hardness: "", // 1 for easy 2 for medium 3 for hard
  title: "",
  set: ["", "", "", ""],
  answer: "",
  fullAnswer: "",
  randomize: true,
};

const question = createSlice({
  name: "question",
  initialState: {
    questionCategories: initialCategories,
    question: initialQuestion,
    routeByButton: false,
  },
  reducers: {
    SET_CATEGORY: (store, action) => {
      store.questionCategories[action.payload.type] = action.payload.value;
    },
    SET_QUESTION_HARDNESS: (store, action) => {
      store.question.hardness = action.payload.hardness;
    },
    SET_QUESTION_Property: (store, action) => {
      store.question[action.payload.type] = action.payload.data;
    },
    SET_QUESTION_SET: (store, action) => {
      store.question.set[action.payload.item] = action.payload.data;
    },
    SET_ROUTE_BY_BUTTON: (store, action) => {
      store.routeByButton = action.payload.value;
    },
    RESET_QUESTION: (store) => {
      store.question = initialQuestion;
    },
    RESET_CATEGORIES: (store) => {
      store.questionCategories = initialCategories;
    },
  },
});

export default question.reducer;

export const {
  SET_CATEGORY,
  SET_QUESTION_HARDNESS,
  SET_QUESTION_Property,
  SET_QUESTION_SET,
  SET_ROUTE_BY_BUTTON,
  RESET_CATEGORIES,
  RESET_QUESTION,
} = question.actions;
