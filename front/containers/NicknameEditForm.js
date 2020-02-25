import React, {useCallback, useState} from 'react';
import { Form, Input, Button } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {EDIT_NICKNAME_REQUEST} from "../reducers/user";

const NicknameEditForm = () => {
    const [editName, setEditName] = useState('');
    const dispatch = useDispatch();
    const { me, isEditingNickname } = useSelector(state => state.user);

    const onChangeNickname = useCallback((e) => {
        setEditName(e.target.value);
    }, []);

    const onEditNickname = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: EDIT_NICKNAME_REQUEST,
            data: editName,
        });
    }, [editName]);

    return (
        <Form style={{marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px'}} onSubmit={onEditNickname}>
            <Input addonBefore="닉네임" value={editName || (me && me.nickname)} onChange={onChangeNickname}/>
            <Button type="primary" htmlType="submit" loading={isEditingNickname}>수정</Button>
        </Form>
    )
};

export default NicknameEditForm;