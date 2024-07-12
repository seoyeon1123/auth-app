import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../utils/apiUtils';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #111;
  color: white;
`;

const Logo = styled.img`
  width: 200px;
  margin-bottom: 30px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #333;
  width: 400px;
  height: 400px;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`;

const InputField = styled.input`
  padding: 12px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  background-color: #222;
  color: white;
  font-size: 16px;
  ::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
`;

const Button = styled.button`
  padding: 8px 0;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  background-color: #e50914;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  &:hover {
    background-color: #ff3e46;
  }
`;

const SignUpMessage = styled.p`
  text-align: end;
  margin-top: 20px;
  font-size: 15px;
`;

const Message = styled.p`
  margin-top: 10px;
`;

export interface ILoginData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>();

  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const onSubmitLogin = async (data: ILoginData) => {
    try {
      const userId = await loginUser(data);
      setMessage('로그인 성공!');

      // Redirect to home with userId
      if (userId) {
        const redirectUrl = `http://localhost:3001/home?id=${userId}`;
        window.location.href = redirectUrl;
      }
    } catch (error: any) {
      console.error('로그인 요청 실패:', error);
      if (error.response) {
        console.error('응답 데이터:', error.response.data);
        console.error('응답 상태 코드:', error.response.status);
        if (error.response.status === 401) {
          setMessage('인증에 실패했습니다. 다시 로그인하세요.');
        } else {
          setMessage('로그인 실패. 다시 시도하세요.');
        }
      }
    }
  };

  return (
    <Container>
      <Logo src="/path/to/your/logo.png" alt="Logo" />
      <LoginForm onSubmit={handleSubmit(onSubmitLogin)}>
        <InputContainer>
          <InputField
            id="email"
            type="email"
            placeholder="이메일"
            {...register('email', {
              required: '이메일을 입력하세요',
              pattern: {
                value: /^\S+@\S+$/i,
                message: '올바른 이메일 형식을 입력하세요',
              },
            })}
          />
          {errors.email && <Message>{errors.email.message}</Message>}
        </InputContainer>
        <InputContainer>
          <InputField
            id="password"
            type="password"
            placeholder="비밀번호"
            {...register('password', {
              required: '비밀번호를 입력하세요',
              minLength: {
                value: 6,
                message: '비밀번호는 최소 6글자 이상이어야 합니다.',
              },
            })}
          />
          {errors.password && <Message>{errors.password.message}</Message>}
        </InputContainer>
        <ButtonContainer>
          <Button type="submit">로그인</Button>
          <SignUpMessage>회원이 아니신가요?</SignUpMessage>
          <Link to="/signup">
            <Button>회원가입</Button>
          </Link>
        </ButtonContainer>
      </LoginForm>

      {message && <Message>{message}</Message>}
    </Container>
  );
};

export default Login;
