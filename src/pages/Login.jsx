import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Form,
  Select,
  Layout,
  Typography,
  Image,
  message,
  Avatar,
  Space,
} from 'antd';

import background from '../assets/img/background.png';

import { getQuestions } from '../redux/question.slice';
import { auth, getUsers } from '../redux/user.slice';
import Nav from '../components/Nav';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(state => state.users);
  const questions = useSelector(state => state.questions);

  const onFinish = (values) => {
    const { user } = values;
    if (!user) {
      message.error('Something wrong when logging!')
    } else {
      message
        .loading('Please wait a while...', 1.5)
        .then(() => {
          dispatch(auth(user));

          message.success('Login sucessfully!', 1)
          navigate('/');
        })
    }
  };

  useEffect(() => {
    if (!users.all) dispatch(getUsers());
    if (!questions.all) dispatch(getQuestions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Layout>
    <Header>
      <Nav />
    </Header>
    <Content style={{ padding: '20px 50px' }}>
      <div className='site-layout-content'>
        <div style={{ textAlign: 'center', padding: '0px 30px' }}>
          <Title>Welcome to Would You Rather app!</Title>
          <Title level={3} type='secondary'>Please login to continue</Title>
          <Image
            width={200}
            preview={false}
            src={background}
          />
        </div>
        <br />
        <Form
          labelCol={{
            span: 12,
            offset: 6
          }}
          wrapperCol={{
            span: 12,
            offset: 6
          }}
          name='normal_login'
          className='login-form'
          onFinish={onFinish}
        >
          <Form.Item
            name='user'
            rules={[
              {
                required: true,
                message: 'Please select one user!',
              },
            ]}
          >
            <Select
              placeholder='Select an user to continue'
            >
              {
                users
                && users.all
                && Object.values(users.all).map(
                  user => <Option key={user.id} value={user.id}>
                    <Space>
                      <Avatar shape='square' size='small' src={user.avatarURL} /> {user.name}
                    </Space>
                  </Option>
                )
              }
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Would You Rather App ©2022 Created by HaiNN27</Footer>
  </Layout>;
}

export default LoginPage;