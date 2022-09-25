import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from '../utils/api';

const getUsers = createAsyncThunk('users/get-users', async () => {
  const users = await API.getUsers();

  return users;
});

const addQuestion = createAsyncThunk('users/add-question', async (question) => {
  const questionData = await API.saveQuestion(question);

  return questionData;
});

const updateQuestionForUser = createAsyncThunk('users/update-question-for-user', async (answer) => {
  const questionData = await API.saveQuestionAnswer(answer);

  return questionData;
});

const initialState = {
  all: '',
  current: '',
  loading: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    auth: (state, action) => {
      state.current = state.all[action.payload];
    },
    logout: (state, _action) => {
      state.current = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, _action) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.all = action.payload;
      state.loading = false;
    });
    builder.addCase(addQuestion.pending, (state, _action) => {
      state.loading = true;
    });
    builder.addCase(addQuestion.fulfilled, (state, action) => {
      state.all[action.payload.author].questions.push(action.payload.id);
      state.loading = false;
    });
    builder.addCase(updateQuestionForUser.pending, (state, _action) => {
      state.loading = true;
    });
    builder.addCase(updateQuestionForUser.fulfilled, (state, action) => {
      state.all[action.payload.authedUser].answers[action.payload.qid] = action.payload.answer;
      state.loading = false;
    });
  },
});

const { auth, logout } = userSlice.actions;
const reducer = userSlice.reducer;

export {
  getUsers,
  auth,
  logout,
  addQuestion,
  updateQuestionForUser
};

export default reducer;