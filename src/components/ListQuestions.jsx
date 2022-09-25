import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { List } from 'antd';
import { ANSWERED, UNANSWERED } from '../constants';
import { getQuestions } from '../redux/question.slice';
import { getUsers } from '../redux/user.slice';
import Question from './Question';



const ListQuestions = (props) => {
  const dispatch = useDispatch();
  const { type } = props;
  const questions = useSelector(state => state.questions.all);
  const user = useSelector(state => state.users.current)

  const listUnanswered = useMemo(
    () => user && user.id
      ? Object.values(questions).filter(({ optionOne, optionTwo }) =>
        ![...optionOne.votes, ...optionTwo.votes].includes(user.id)
      )
      : [],
    [questions, user]
  );

  const listAnswered = useMemo(
    () => user && user.id
      ? Object.values(questions).filter(({ optionOne, optionTwo }) =>
        [...optionOne.votes, ...optionTwo.votes].includes(user.id)
      )
      : [],
    [questions, user]
  );

  useEffect(() => {
    if (!questions) dispatch(getQuestions());
    if (!user) dispatch(getUsers());
  }, [dispatch, questions, user])

  return <>
    {
      type === ANSWERED
        ? <List
          grid={{
            gutter: 8,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
          dataSource={_.orderBy(listAnswered, ['timestamp'], ['desc'])}
          renderItem={item => (
            <List.Item key={item.id}>
              <Question type={ANSWERED} data={item} />
            </List.Item>
          )}
        />
        : <List
          grid={{
            gutter: 8,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
          dataSource={_.orderBy(listUnanswered, ['timestamp'], ['desc'])}
          renderItem={item => (
            <List.Item key={item.id}>
              <Question type={UNANSWERED} data={item} />
            </List.Item>
          )}
        />
    }
  </>
}

export default ListQuestions;