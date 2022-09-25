import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import {
  Layout,
  Typography,
  Row,
} from 'antd';
import Nav from '../components/Nav';
import LeaderBoardCard from '../components/LeaderBoardCard';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const LeaderBoard = () => {
  const allUsers = useSelector((state) => state.users.all);
  let users = Object.values(allUsers);
  users = users.map((user) => {
    const numOfAnswers = Object.keys(user.answers).length;
    const numOfQuestions = user.questions.length
    const total = numOfAnswers + numOfQuestions;

    return {
      total,
      numOfAnswers,
      numOfQuestions,
      name: user.name,
      avatarURL: user.avatarURL,
    }
  });
  users = _.orderBy(users, ['total'], ['desc']);

  return <Layout>
    <Header>
      <Nav />
    </Header>
    <Content style={{ padding: '20px 50px' }}>
      <div className='site-layout-content'>
        <Title style={{ textAlign: 'center', padding: '0px 30px' }}>Leader Board</Title>
        <Row justify='center' align='top'>
          {
            users
            && Object.values(users).length
            && Object.values(users).map(
              (user, index) => {
                const nth = index + 1;
                return <LeaderBoardCard key={index} nth={nth} data={user} />
              })
          }
        </Row>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Would You Rather App ©2022 Created by HaiNN27</Footer>
  </Layout>;
};

export default LeaderBoard;