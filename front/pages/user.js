import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {loadUserPostsRequestAction} from "../reducers/post";
import PostCard from "../components/PostCard";
import {Avatar, Card} from "antd";
import {loadUserRequestAction} from "../reducers/user";

const User = ({ id }) => {
    const dispatch = useDispatch();
    const { mainPosts } = useSelector(state => state.post);
    const { userInfo } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(loadUserRequestAction({
            data: id,
        }));
        dispatch(loadUserPostsRequestAction({
            data: id,
        }));
    }, []);
    return (
        <div>
            {userInfo
                ? (
                <Card
                    actions={[
                        <div key="twit">
                            쨱짹
                            <br/>
                            {userInfo.Posts}
                        </div>,
                        <div key="following">
                            팔로잉
                            <br/>
                            {userInfo.Followings}
                        </div>,
                        <div key="follower">
                            팔로워
                            <br/>
                            {userInfo.Followers}
                        </div>,
                    ]}
                >
                    <Card.Meta
                        avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                        title={userInfo.nickname}
                    />
                </Card>)
                : null}
            {mainPosts.map(c => (
                <PostCard key={+c.createdAt.valueOf()} post={c} />
            ))}
        </div>
    );
};

User.propTypes = {
    id: PropTypes.number.isRequired,
};

// 제일 먼저 작동됨
User.getInitialProps = async (context) => {
    console.log('user getInitialProps',context.query.id);
    return { id: parseInt(context.query.id, 10) };
};

export default User;