import { configureStore } from '@reduxjs/toolkit';

// import logger from '../utils/logger';
import userReducer from './user.slice';
import questionReducer from './question.slice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    questions: questionReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
