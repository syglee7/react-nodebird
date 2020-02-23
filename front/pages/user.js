import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";
import {loadUserPostsRequestAction} from "../reducers/post";
import PostCard from "../components/PostCard";
import {Avatar, Card} from "antd";
import {loadUserRequestAction} from "../reducers/user";

const User = () => {
    const { mainPosts } = useSelector(state => state.post);
    const { userInfo } = useSelector(state => state.user);

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
    const id = parseInt(context.query.id, 10);
    console.log('user getInitialProps',id);

    context.store.dispatch(loadUserRequestAction({
        data: id,
    }));
    context.store.dispatch(loadUserPostsRequestAction({
        data: id,
    }));

    return { id };
};

export default User;