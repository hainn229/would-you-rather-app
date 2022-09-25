import React, { useState } from 'react';
import {
  Typography,
  Tabs
} from 'antd';

import ListQuestions from '../components/ListQuestions';
import { ANSWERED, UNANSWERED } from '../constants';

const { Title } = Typography;

const Home = (props) => {
  const { data } = props;
  const [type, setType] = useState(UNANSWERED);

  const onTabClick = (type) => setType(type);

  return <Tabs
    defaultActiveKey={UNANSWERED}
    centered
    onTabClick={onTabClick}
    items={
      [UNANSWERED, ANSWERED].map((value) => ({
        label: <Title level={3}>{value}</Title>,
        key: value,
        children: <ListQuestions type={type} data={data} />,
      }))
    }
  />

};

export default Home;