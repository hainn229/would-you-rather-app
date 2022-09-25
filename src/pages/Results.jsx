import React from 'react';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Button,
  Card,
  Typography,
  Image,
  Row,
  Col,
  Progress,
  Tag
} from 'antd';

const { Title, Text } = Typography;

const Results = (props) => {
  const navigate = useNavigate();

  const params = useParams();
  const questionId = params.id;

  const {
    user: userFromProps,
    questions: questionsFromProps,
    users: usersFromProps,
  } = props;

  const questionsFromState = useSelector((state) => state.questions.all);
  const usersFromState = useSelector((state) => state.users.all);
  const userFromState = useSelector((state) => state.users.current);

  const user = userFromState || userFromProps
  const questions = questionsFromState || questionsFromProps;
  const users = usersFromState || usersFromProps;

  const question = questions ? questions[questionId] : '';
  const { author, timestamp, optionOne, optionTwo } = question;
  const authorData = users && author ? users[author] : '';

  const nVoteOne = question && optionOne ? optionOne.votes.length : 0;
  const nVoteTwo = question && optionTwo ? optionTwo.votes.length : 0;
  const totalVote = nVoteOne + nVoteTwo;
  let percentOne = nVoteOne / totalVote * 100;
  percentOne = percentOne.toFixed(0);
  const percentTwo = 100 - Number(percentOne);

  return <Row justify='center' align='top'>
    <Card
      title={
        <>
          <Title level={4} style={{ float: 'left' }}>
            Asked by {authorData.name}:
          </Title>
          <Text type='secondary' style={{ float: 'right' }}>
            Created at: {moment(new Date(question && timestamp)).format('YYYY-MM-DD hh:mm A')}
          </Text>
        </>
      }

      style={{
        width: '100%',
        minWidth: 300,
        maxWidth: 700
      }}
    >
      <Row justify='center' align='top'>
        <Col flex={1}>
          <Image
            style={{
              padding: 20
            }}
            width='100%'
            src={authorData.avatarURL}
            preview={false}
          />
        </Col>
        <Col flex={4}>
          <Title level={3} style={{ textAlign: 'left' }}>Results:</Title>
          <Title level={4} type='secondary' style={{ textAlign: 'left' }}>
            Would you rather ...
          </Title>
          <Card
            title={<Row>
              <Col flex={4} style={{ textAlign: 'left' }}>
                <Text >{question && optionOne ? optionOne.text : ''}</Text>
              </Col>
              <Col flex={1}>
                {question && optionOne && optionOne.votes.includes(user.id) ? <Tag color='green'>Your voted</Tag> : ''}
              </Col>
            </Row>}
          >
            <Progress
              strokeColor={{
                from: '#108ee9',
                to: '#87d068',
              }}
              percent={percentOne}
              status='active'
            />
            <Text>{nVoteOne} out of {totalVote} votes</Text>
          </Card>
          <br />
          <Card
            title={<Row>
              <Col flex='auto' style={{ textAlign: 'left' }}>
                <Text >{question && optionTwo ? optionTwo.text : ''}</Text>
              </Col>
              <Col flex='100px'>
                {question && optionTwo && optionTwo.votes.includes(user.id) ? <Tag color='green'>Your voted</Tag> : ''}
              </Col>
            </Row>}
          >
            <Progress
              strokeColor={{
                from: '#108ee9',
                to: '#87d068',
              }}
              percent={percentTwo}
              status='active'
            />
            <Text>{nVoteTwo} out of {totalVote} votes</Text>
          </Card>
          <br />
          <Button
            onClick={() => navigate('/')}
            style={{ float: 'right' }}
            type='primary'
          >
            Back to Home
          </Button>
        </Col>
      </Row>
    </Card>
  </Row>
};

export default Results;