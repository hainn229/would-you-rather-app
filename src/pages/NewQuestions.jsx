import React from 'react';
import { Button, Form, Input, Layout, message, Space, Typography } from 'antd';
import Nav from '../components/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions, saveQuestion } from '../redux/question.slice';
import { useEffect } from 'react';
import { getUsers } from '../redux/user.slice';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const NewQuestion = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const user = useSelector(state => state.users.current);

  const onFinish = (values) => {
    if (!values) {
      message('Please input all option!');
    } else {
      message
        .loading('Please wait a while...', 1)
        .then(() => {
          dispatch(saveQuestion({
            optionOneText: values.optionOne,
            optionTwoText: values.optionTwo,
            author: user.id,
          }))
          dispatch(getQuestions());
          form.resetFields();
          message.success('Create new question successfully!', 1)
        })
    }
  };

  useEffect(() => {
    if (!user) dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return <Layout>
    <Header>
      <Nav />
    </Header>
    <Content style={{ padding: '20px 50px' }}>
      <div className='site-layout-content' style={{ textAlign: 'center', padding: '30px' }}>
        <Title>Create New Question</Title>
        <Form
          form={form}
          name='create-new-question'
          labelCol={{
            span: 8,
            offset: 8
          }}
          wrapperCol={{
            span: 8,
            offset: 8
          }}
          layout='vertical'
          onFinish={onFinish}
          autoComplete='off'
          size='large'
        >
          <Title level={3}>Would you rather ... or ...?</Title>
          <Form.Item
            name='optionOne'
            rules={[
              {
                required: true,
                message: 'Please input option one',
              },
            ]}
          >
            <Input placeholder='Enter option one...' />
          </Form.Item>
          <Form.Item
            // label={<Title level={4}>Or...</Title>}
            name='optionTwo'
            rules={[
              {
                required: true,
                message: 'Please input option two!',
              },
            ]}
          >
            <Input placeholder='Enter option two...' />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type='primary' htmlType='submit'>Submit</Button>
              <Button onClick={() => form.resetFields()}>Clear</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Would You Rather App ©2022 Created by HaiNN27</Footer>
  </Layout>;
};

export default NewQuestion;