import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { List } from 'antd';
import { ANSWERED, UNANSWERED } from '../constants';
import Question from './Question';



const ListQuestions = (props) => {
  const { type, data } = props;
  const { user: userFromProps, questions: questionsFromProps } = data;
  const userFromState = useSelector(state => state.users.current);
  const questionsFromState = useSelector(state => state.questions.all);
  
  const user = userFromProps || userFromState;
  const questions = questionsFromProps || questionsFromState;

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