import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Layout,
  Card,
  Typography,
  Image,
  Row,
  Col,
  Form,
  Radio,
  message
} from 'antd';
import Nav from '../components/Nav';
import { useEffect } from 'react';
import { getQuestions, saveQuestionAnswer } from '../redux/question.slice';
import { getUsers } from '../redux/user.slice';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const Question = () => {
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

  const onFinish = ({ option }) => {
    if (!option) {
      message.warn('Please select one option');
    } else {
      dispatch(saveQuestionAnswer({ authedUser: currentUser.id, qid: questionId, answer: option }));

      message
        .loading('Please wait a while...', 1)
        .then(() => {
          message.success('Submit answer successfully!', 1)
          navigate(`/questions/${questionId}/results`);
        })
    }
  };

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
              maxWidth: 600
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
                <Title level={3} type='secondary' style={{ textAlign: 'left' }}>
                  Would you rather
                </Title>
                <Form
                  name='answer-question'
                  onFinish={onFinish}
                  autoComplete='off'
                >
                  <Form.Item
                    name='option'
                    rules={[
                      {
                        required: true,
                        message: 'Please select one option!',
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio
                        key='1'
                        value='optionOne'
                        style={{ float: 'left' }}
                      >
                        {optionOne.text}
                      </Radio><br />

                      <Radio
                        key='2'
                        value='optionTwo'
                        style={{ float: 'left' }}
                      >
                        {optionTwo.text}
                      </Radio><br />
                    </Radio.Group>
                  </Form.Item>


                  <Form.Item
                    style={{ marginLeft: 10, width: 100 }}

                  >
                    <Button type='primary' htmlType='submit'>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>

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
  </Layout>
};

export default Question;