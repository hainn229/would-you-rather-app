import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { List } from 'antd';
import { ANSWERED, UNANSWERED } from '../constants';
import Question from './Question';
import { getUsers } from '../redux/user.slice';



const ListQuestions = (props) => {
  const dispatch = useDispatch();
  const { type, data } = props;
  const { user: userFromProps, questions: questionsFromProps } = data;
  const userFromState = useSelector(state => state.users.current);
  const questionsFromState = useSelector(state => state.questions.all);
  
  const user = userFromProps || userFromState;
  const questions = questionsFromProps || questionsFromState;

  const listUnanswered = useMemo(
    () => {
      if (!user) dispatch(getUsers);
      else {
        return user && user.id
          ? Object.values(questions).filter(({ optionOne, optionTwo }) =>
            ![...optionOne.votes, ...optionTwo.votes].includes(user.id)
          )
          : []
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [questions, user]
  );

  const listAnswered = useMemo(
    () => {
      if (!user) dispatch(getUsers);
      else {
        return user && user.id
          ? Object.values(questions).filter(({ optionOne, optionTwo }) =>
            [...optionOne.votes, ...optionTwo.votes].includes(user.id)
          )
          : []
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          renderItem={(item) => (
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