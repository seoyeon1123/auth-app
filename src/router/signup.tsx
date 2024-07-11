import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

interface IData {
  name: string;
  email: string;
  password: string;
  verificationCode: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IData>();

  const onSubmit = async (data: IData) => {
    try {
      const response = await axios.post('http://localhost:3000/user', {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log('Registration successful:', response.data);
      setMessage('회원가입 성공!');
      setSignUpSuccess(true);
      reset();
      setVerificationSent(false);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Registration failed:', error);
      setMessage('회원가입 실패. 다시 시도하세요.');
    }
  };

  const sendVerificationCode = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/sendVerification',
        {
          email: email,
        }
      );
      console.log('Verification code sent:', response.data);
      setMessage('인증번호가 이메일로 전송되었습니다.');
      setVerificationSent(true);
    } catch (error) {
      console.error('Failed to send verification code:', error);
      setMessage('인증번호 전송에 실패했습니다. 다시 시도하세요.');
    }
  };

  const verifyCodeauth = async () => {
    try {
      const response = await axios.post('http://localhost:3000/verifyCode', {
        email: email,
        code: verificationCode,
      });
      console.log('Verification code sent:', response.data);
      setMessage('인증이 완료되었습니다.');
    } catch (error) {
      console.error('Failed to auth verification code:', error);
      setMessage('인증번호가 틀립니다.');
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            placeholder="이름을 입력하세요"
            {...register('name', {
              required: '이름을 입력하세요',
              minLength: {
                value: 2,
                message: '이름은 최소 2글자 이상이어야 합니다',
              },
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력하세요"
            {...register('email', {
              required: '이메일을 입력하세요',
              pattern: {
                value: /^\S+@\S+$/i,
                message: '올바른 이메일 형식을 입력하세요',
              },
            })}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        {verificationSent ? (
          <div>
            <label htmlFor="verificationCode">인증번호:</label>
            <input
              type="text"
              id="verificationCode"
              placeholder="인증번호를 입력하세요"
              {...register('verificationCode', {
                required: '인증번호를 입력하세요',
              })}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button onClick={verifyCodeauth}> 인증 하기 </button>
            {errors.verificationCode && (
              <p>{errors.verificationCode.message}</p>
            )}
          </div>
        ) : (
          <button type="button" onClick={sendVerificationCode}>
            인증번호 전송
          </button>
        )}
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            {...register('password', {
              required: '비밀번호를 입력하세요',
              minLength: {
                value: 6,
                message: '비밀번호는 최소 6글자 이상이어야 합니다',
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">회원가입</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
