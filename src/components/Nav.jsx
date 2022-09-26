import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
import { getUsers, logout } from '../redux/user.slice';

const Nav = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const { data } = props;
  const [user, setUser] = useState(data.user);
  const [current, setCurrent] = useState('');
  const userData = useSelector(state => state.users.current);

  const onClickLeft = (e) => {
    if (location.pathname === '/') setCurrent('/')
    else setCurrent(e.key)
  };
  const onClickRight = (e) => {
    if (e.key.toLowerCase() === 'logout') {
      localStorage.removeItem('currentUserWouldYouRatherApp');
      setUser('');
      dispatch(logout())
      navigate('/login');
    }
  };

  useEffect(() => {
    if (!user) {
      dispatch(getUsers());
      setUser(userData);
    }
  }, [data, dispatch, user, userData])

  return <Row>
    <Col span={16}>
      <Menu
        theme='dark'
        onClick={onClickLeft}
        selectedKeys={[current]}
        mode='horizontal'
        items={
          user
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
            : ''
        }
      />
    </Col>

    <Col span={8}>
      <Menu
        theme='dark'
        mode='horizontal'
        onClick={onClickRight}
        items={
          user
            ? [
              {
                label: `Hello, ${user.name}!`,
                key: 'user',
                icon: user.avatarURL
                  ? <Avatar shape='round' size='large' src={user.avatarURL} />
                  : <UserOutlined />,
              },
              {
                label: 'Logout',
                key: 'logout',
                icon: <LogoutOutlined />,
                danger: true
              }
            ]
            : [
              {
                label: <Link to='/login'>Login</Link>,
                key: 'login',
                icon: <LoginOutlined />,
              }
            ]
        }
      />
    </Col>
  </Row>;
};

export default Nav;