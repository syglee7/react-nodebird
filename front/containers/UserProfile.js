import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';
import Link from "next/link";

const UserProfile = () => {
    const { me } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
    dispatch(logoutRequestAction);
    }, []);

    return (
        <Card
            actions={[
                // key 는 항상 제일 상위에 있어야 함
                <Link href="/profile" key="twit" prefetch><a><div>짹짹 <br /> {me.Posts.length}</div></a></Link>,
                <Link href="/profile" key="following" prefetch><a><div>팔로잉 <br /> {me.Followings.length}</div></a></Link>,
                <Link href="/profile" key="follower" prefetch><a><div>팔로워 <br /> {me.Followers.length}</div></a></Link>
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    );
};

export default UserProfile;
