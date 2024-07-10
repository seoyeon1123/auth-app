// App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './signup'; // signup 컴포넌트는 대문자로 시작해야 합니다.
import Home from './home'; // home 컴포넌트는 대문자로 시작해야 합니다.

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />{' '}
          {/* Route element에는 대문자 컴포넌트명 사용 */}
          <Route path="/" element={<Home />} />{' '}
          {/* Route element에는 대문자 컴포넌트명 사용 */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
