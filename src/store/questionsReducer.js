import { createSlice } from "@reduxjs/toolkit";

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    selectedId: null,
  },
  reducers: {
    addQuestions: (state, action) => {
      state.questions = [...state.questions, ...action.payload];
    },
    clearQuestions: (state) => {
      state.questions = [];
      state.selectedId = null;
    },
    selectQuestion: (state, action) => {
      state.selectedId = action.payload;
    },
  },
});

export const { addQuestions, clearQuestions, selectQuestion } =
  questionsSlice.actions;
export default questionsSlice.reducer;
