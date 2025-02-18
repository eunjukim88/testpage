import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import MobileContainer from '../components/MobileContainer';
import { Button, Input } from '../components/styled/Common';

const LoginForm = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
`;

function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  const handlePhoneChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    if (formattedPhoneNumber.length <= 13) {
      setPhone(formattedPhoneNumber);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 사용자 검증
    if (phone === '010-1111-1111' && verificationCode === '1111') {
      localStorage.setItem('userType', 'user');
      localStorage.setItem('phone', phone);
      router.push('/user-dashboard');
    }
    // 관리자 검증
    else if (phone === '010-2222-2222' && verificationCode === '2222') {
      localStorage.setItem('userType', 'admin');
      localStorage.setItem('phone', phone);
      router.push('/admin-dashboard');
    }
    else {
      setError('전화번호 또는 인증번호가 올바르지 않습니다.');
    }
  };

  return (
    <MobileContainer>
      <LoginForm onSubmit={handleLogin}>
        <h2>로그인</h2>
        <Input
          type="tel"
          placeholder="전화번호 (예: 010-0000-0000)"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={13}
        />
        <Input
          type="text"
          placeholder="인증번호"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">로그인</Button>
      </LoginForm>
    </MobileContainer>
  );
}

export default Login; 