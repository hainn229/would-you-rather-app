import React from 'react';
import { Button, Form, Input, message, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getQuestions, saveQuestion } from '../redux/question.slice';
import { getUsers } from '../redux/user.slice';

const { Title } = Typography;

const NewQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const user = useSelector(state => state.users.current);

  const onFinish = (values) => {
    if (!values) {
      message('Please input all option!');
    } else {
      message
        .loading('Please wait a while...', 1)
        .then(() => {
          if (!user) dispatch(getUsers());
          else {
            dispatch(saveQuestion({
              optionOneText: values.optionOne,
              optionTwoText: values.optionTwo,
              author: user.id,
            }))
            dispatch(getQuestions());
            form.resetFields();
            message.success('Create new question successfully!', 1)
            navigate('/');
          }
        })
    }
  };

  return <>
    {user ?
      <div style={{ textAlign: 'center', padding: '30px' }}>
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
      : ''}
  </>
};

export default NewQuestion;