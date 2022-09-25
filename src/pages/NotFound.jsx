import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Layout,
} from 'antd';
import Nav from '../components/Nav';

const { Header, Content, Footer } = Layout;

const NotFound = () => {
  const navigate = useNavigate();
  let isBackToHome = false;
  const user = useSelector(state => state.users.current);
  const text = user ? 'Back Home' : 'Login';

  const onBackToHome = () => {
    isBackToHome = true;
    if (user) navigate('/')
    else navigate('/login')
  }

  useEffect(() => {
    if (!isBackToHome) {
      setTimeout(() => {
        if (user) navigate('/')
        else navigate('/login')
      }, 5000);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Layout>
    <Header>
      <Nav />
    </Header>
    <Content style={{ padding: '20px 50px' }}>
      <div className='site-layout-content'>
        <Result
          status='404'
          title='404'
          subTitle={`Sorry, the page you visited does not exist. This page will be redirected to ${text} after 5 seconds`}
          extra={<Button type='primary' onClick={onBackToHome}>{text}</Button>}
        />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Would You Rather App ©2022 Created by HaiNN27</Footer>
  </Layout >
};

export default NotFound;

