import { createSlice } from "@reduxjs/toolkit";

const question = createSlice({
  name: "question",
  initialState: {
    questionCategories: {
      major: "",
      grade: "",
      course: "",
      subject: "",
    },
    question: {
      hardness: "", // 1 for easy 2 for medium 3 for hard
      body: "",
      set: ["", "", "", ""],
      answer: "",
      fullAnswer: "",
      randomize: true,
    },
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
  },
});

export default question.reducer;

export const { SET_CATEGORY, SET_QUESTION_HARDNESS, SET_QUESTION_Property, SET_QUESTION_SET } =
  question.actions;
