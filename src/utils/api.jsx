import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA';

import { faker } from '@faker-js/faker';

export const getUsers = async () => {
  const users = await _getUsers();
  const ids = Object.keys(users);
  for (const id of ids) {
    users[id].avatarURL = users[id].avatarURL ? users[id].avatarURL : faker.image.avatar();
  }
  return users;
};

export const getQuestions = async () => {
  const questions = await _getQuestions();

  return questions;
};

export const saveQuestion = async (question) => {
  const result = await _saveQuestion(question);

  return result;
};

export const saveQuestionAnswer = async (answer) => {
  const result = await _saveQuestionAnswer(answer);

  return result;
};
