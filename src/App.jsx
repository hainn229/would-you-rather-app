import './App.css';
import React, { useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginPage from './pages/Login';
import Home from './pages/Home';
import NewQuestion from './pages/NewQuestions';
import LeaderBoard from './pages/LeaderBoard';
import Answers from './pages/Answers';
import Results from './pages/Results';
import NotFound from './pages/NotFound';


const App = () => {
  const navigate = useNavigate();

  const users = useSelector((state) => state.users);

  useEffect(() => {
    setTimeout(() => {
      if (!users.current) {
        navigate('/login');
      }
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  return <Routes>
    <Route>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/add' element={<NewQuestion />} />
      <Route exact path='/leaderboard' element={<LeaderBoard />} />
      <Route exact path='/questions/:id/answers' element={<Answers />} />
      <Route exact path='/questions/:id/results' element={<Results />} />
    </Route>
    <Route path='/login' element={<LoginPage />} />
    <Route path='*' element={<NotFound />} />
  </Routes>;
}

export default App;