import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Layout,
  Typography,
  Tabs
} from 'antd';
import { useNavigate } from 'react-router-dom';

import Nav from '../components/Nav';
import ListQuestions from '../components/ListQuestions';
import { ANSWERED, UNANSWERED } from '../constants';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const [type, setType] = useState(UNANSWERED);

  const onTabClick = (type) => setType(type);

  useEffect(() => {
    if (!(users.current && users.current.name)) navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users])

  return <Layout className='layout'>
    <Header>
      <Nav />
    </Header>

    <Content style={{ padding: '20px 50px' }}>
      <div className='site-layout-content'>
        <Tabs
          defaultActiveKey={UNANSWERED}
          centered
          onTabClick={onTabClick}
          items={
            [UNANSWERED, ANSWERED].map((value) => ({
              label: <Title level={3}>{value}</Title>,
              key: value,
              children: <ListQuestions type={type} />,
            }))
          }
        />
      </div>
    </Content>

    <Footer style={{ textAlign: 'center' }}>Would You Rather App ©2022 Created by HaiNN27</Footer>
  </Layout>
};

export default Home;