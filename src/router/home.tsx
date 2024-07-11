import React from 'react';
import { logout, isLoggedIn } from '../authUtils';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(); // 로그아웃 함수 호출
    navigate('/');
  };

  return (
    <>
      <h1>메인화면 입니다.</h1>
      {isLoggedIn() && <button onClick={handleLogout}>Logout</button>}
    </>
  );
};

export default Home;
