import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  HomeOutlined,
  RiseOutlined,
  PlusOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined
} from '@ant-design/icons';
import {
  Avatar,
  Col,
  Menu,
  Row
} from 'antd';
import { logout } from '../redux/user.slice';

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.users.current);
  const [current, setCurrent] = useState('');

  const onClickLeft = (e) => setCurrent(e.key);
  const onClickRight = (e) => {
    if (e.key === '404') navigate('/something-not-found')
    if (e.key.toLowerCase() === 'logout') {
      dispatch(logout())
      navigate('/login');
    };
    
  };

  const itemsLeft = user
    ? [
      {
        label: <Link to='/'>Home</Link>,
        key: 'home',
        icon: <HomeOutlined />,
      },
      {
        label: <Link to='/add'>New Question</Link>,
        key: 'new',
        icon: <PlusOutlined />,
      },
      {
        label: <Link to='/leaderboard'>Leader Board</Link>,
        key: 'leaderboard',
        icon: <RiseOutlined />
      }
    ]
    : '';

  const itemsRight = user
    ? [
      {
        label: `Hello, ${user.name}!`,
        key: 'user',
        icon: user.avatarURL
          ? <Avatar shape='square' size='large' src={user.avatarURL} />
          : <UserOutlined />,
      },
      {
        label: 'Logout',
        key: 'logout',
        icon: <LogoutOutlined />,
        danger: true
      },
      {
        label: 'For Page Not Found',
        key: '404',
      },
    ]
    : [
      {
        label: <Link to='/login'>Login</Link>,
        key: 'login',
        icon: <LoginOutlined />,
      },
      {
        label: 'For Page Not Found',
        key: '404',
      },
    ];

  return <Row>
    <Col span={16}>
      <Menu
        theme='dark'
        onClick={onClickLeft}
        selectedKeys={[current]}
        mode='horizontal'
        items={itemsLeft}
      />
    </Col>

    <Col span={8}>
      <Menu
        theme='dark'
        mode='horizontal'
        onClick={onClickRight}
        items={itemsRight}
      />
    </Col>
  </Row>;
};

export default Nav;