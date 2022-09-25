import React from 'react';
import {
  Card,
  Typography,
  Image,
  Row,
  Col,
  Divider,
  Tag
} from 'antd';

const { Meta } = Card;
const { Title, Text } = Typography;

const LeaderBoardCard = (props) => {
  const { data, nth } = props;
  let tagTotal, nthText;
  switch (nth) {
    case 1:
      tagTotal = <Tag color='#f50' style={{ color: 'white' }}>Total: {data.total}</Tag>
      nthText = <Tag color='#f50' style={{ color: 'white' }}>1st</Tag>;
      break;

    case 2:
      tagTotal = <Tag color='#2db7f5' style={{ color: 'white' }}>Total: {data.total}</Tag>
      nthText = <Tag color='#2db7f5' style={{ color: 'white' }}>2nd</Tag>
      break;

    default:
      tagTotal = <Tag color='#87d068' style={{ color: 'white' }}>Total: {data.total}</Tag>
      nthText = <Tag color='#87d068' style={{ color: 'white' }}>3rd</Tag>;
      break;
  }

  return <Card
    title={<Title level={3}>{nthText} {data.name}</Title>}
    extra={tagTotal}
    style={{
      width: '100%',
      minWidth: 300,
      maxWidth: 600,
      marginBottom: 20
    }}
  >
    <Meta
      avatar={<Image src={data.avatarURL} />}
      description={
        <Row justify='center' align='top'>
          <Col>
            <Text>Answered questions: <strong>{data.numOfAnswers}</strong></Text>
            <Divider />
            <Text>Created questions: <strong>{data.numOfQuestions}</strong></Text>
          </Col>
        </Row>
      }
    />
  </Card>
}

export default LeaderBoardCard;