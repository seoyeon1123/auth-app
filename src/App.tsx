// App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './router/signup'; //
import Login from './router/login';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />{' '}
          {/* Route element에는 대문자 컴포넌트명 사용 */}
          <Route path="/login" element={<Login />} />{' '}
          {/* Route element에는 대문자 컴포넌트명 사용 */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
