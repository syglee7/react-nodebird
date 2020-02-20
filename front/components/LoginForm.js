import React, { useCallback } from 'react';
import Link from 'next/link';
import { Form, Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../pages/signup';
import { loginRequestAction } from '../reducers/user';

const LoginForm = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { isLoggingIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSubmitForm = useCallback((e) => { // 자식 컴포넌트에 넘기는 함수는 무조건 useCallback
    e.preventDefault();
    dispatch(loginRequestAction({
      id,
      password,
    }));
  }, [id, password]);

  return (
    <Form onSubmit={onSubmitForm} style={{ padding: '10px' }}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Button type="primary" htmlType="submit" loading={isLoggingIn}>로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </div>
    </Form>
  );
};
export default LoginForm;
