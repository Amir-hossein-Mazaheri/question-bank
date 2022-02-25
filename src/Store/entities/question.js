import { createSlice } from "@reduxjs/toolkit";

const question = createSlice({
  name: "question",
  initialState: {
    addQuestionHardness: "", // 1 for easy 2 for medium 3 for hard
    questionCategories: {
      major: "",
      grade: "",
      course: "",
      subject: "",
    },
  },
  reducers: {
    SET_CATEGORY: (store, action) => {
      store.questionCategories[action.payload.type] = action.payload.value;
    },
    SET_QUESTION_HARDNESS: (store, action) => {
      store.addQuestionHardness = action.payload.hardness;
    },
  },
});

export default question.reducer;

export const { SET_CATEGORY, SET_QUESTION_HARDNESS } = question.actions;
