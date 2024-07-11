import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

interface ILoginData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>();
  const [message, setMessage] = useState('');

  const onSubmitLogin = async (data: ILoginData) => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: data.email,
        password: data.password,
      });

      console.log('서버 응답:', response);

      // 서버 응답에서 토큰 추출
      const token = response.data.token;

      if (token) {
        localStorage.setItem('token', token);
        console.log('토큰 저장 완료:', token);
        setMessage('로그인 성공!');
      } else {
        console.error('토큰이 없습니다.');
        setMessage('로그인 실패. 다시 시도하세요.');
      }
    } catch (error) {
      console.error('로그인 요청 실패:', error);
      setMessage('로그인 실패. 다시 시도하세요.');
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <div>
          <label htmlFor="email">이메일:</label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
            {...register('email', {
              required: '이메일을 입력하세요',
              pattern: {
                value: /^\S+@\S+$/i,
                message: '올바른 이메일 형식을 입력하세요',
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            {...register('password', {
              required: '비밀번호를 입력하세요',
              minLength: {
                value: 6,
                message: '비밀번호는 최소 6글자 이상이어야 합니다.',
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">로그인</button>
      </form>
      <Link to="/signup">
        <button type="button">회원가입</button>
      </Link>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
