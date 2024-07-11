// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './router/signup';
import Login from './router/login';
import Home from './router/home';
import PrivateRoute from './router/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute userAuthentication={true} />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
