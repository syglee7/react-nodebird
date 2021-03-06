import React, { useState, useCallback, useEffect } from 'react';
import {
  Form, Input, Checkbox, Button,
} from 'antd';
import styled from "styled-components";
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { signUpRequestAction } from '../reducers/user';

const SignupError = styled.div`
  color: red;
`;

export const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);

  return [value, handler];
};

const Signup = () => {
  /* const [id, setId] = useState('');
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState(''); */
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);
  const dispatch = useDispatch();
  const { isSigningUp, me } = useSelector(state => state.user);

  useEffect(() => {
    if (me) {
      alert('메인 페이지로 이동');
      Router.push('/');
    }
  }, [me && me.id]);

  const [id, onChangeId] = useInput('');
  const [nick, onChangeNick] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }

    if (!term) {
      return setTermError(true);
    }

    dispatch(signUpRequestAction({
      userId: id,
      password,
      nickname: nick,
    }));
  }, [id, nick, password, passwordCheck, term]);

  /* const onChangeId = (e) => {
        setId(e.target.value);
    };

    const onChangeNick = (e) => {
        setNick(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }; */

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  }, [password]);

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  if (me) {
    return null;
  }

  return (
    <>
      <Form onSubmit={onSubmit} style={{ padding: 10 }}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" value={id} required onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <Input name="user-nick" value={nick} required onChange={onChangeNick} />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input name="user-password" value={password} type="password" required onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 체크</label>
          <br />
          <Input name="user-password-check" value={passwordCheck} type="password" required onChange={onChangePasswordCheck} />
          {passwordError && <SignupError>비밀번호가 일치하지 않습니다.</SignupError>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>약관에 동의합니다.</Checkbox>
          {termError && <SignupError>약관에 동의 하셔야 합니다.</SignupError>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={isSigningUp}>가입하기</Button>
        </div>
      </Form>
    </>
  );
};

export default Signup;
