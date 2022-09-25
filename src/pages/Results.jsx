import React from 'react';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Layout,
  Card,
  Typography,
  Image,
  Row,
  Col,
  Progress,
  Tag
} from 'antd';
import Nav from '../components/Nav';
import { useEffect } from 'react';
import { getQuestions } from '../redux/question.slice';
import { getUsers } from '../redux/user.slice';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const Results = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const questionId = params.id;

  const questions = useSelector((state) => state.questions.all);
  const users = useSelector((state) => state.users.all);
  const currentUser = useSelector((state) => state.users.current);

  useEffect(() => {
    if (!currentUser) navigate('/login');
    if (!questions) dispatch(getQuestions());
    if (!users) dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, users, currentUser])

  const question = questions[questionId];
  const { author, timestamp, optionOne, optionTwo } = question;
  const authorData = users[author];

  const [nVoteOne, nVoteTwo] = [optionOne.votes.length, optionTwo.votes.length]
  const totalVote = nVoteOne + nVoteTwo;
  let percentOne = nVoteOne / totalVote * 100;
  percentOne = percentOne.toFixed(0);
  const percentTwo = 100 - Number(percentOne);
  return <Layout className='layout'>
    <Header>
      <Nav />
    </Header>

    <Content style={{ padding: '20px 50px' }}>
      <div className='site-layout-content'>
        <Row justify='center' align='top'>
          <Card
            title={
              <>
                <Title level={4} style={{ float: 'left' }}>
                  Asked by {authorData.name}:
                </Title>
                <Text type='secondary' style={{ float: 'right' }}>
                  Created at: {moment(new Date(timestamp)).format('YYYY-MM-DD hh:mm A')}
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
                      <Text >{optionOne.text}</Text>
                    </Col>
                    <Col flex={1}>
                      {optionOne.votes.includes(currentUser.id) ? <Tag color='green'>Your voted</Tag> : ''}
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
                      <Text >{optionTwo.text}</Text>
                    </Col>
                    <Col flex='100px'>
                      {optionTwo.votes.includes(currentUser.id) ? <Tag color='green'>Your voted</Tag> : ''}
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
      </div>
    </Content>

    <Footer style={{ textAlign: 'center' }}>Would You Rather App ©2022 Created by HaiNN27</Footer>
  </Layout >
};

export default Results;