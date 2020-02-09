import React from 'react';
import { Card, Icon, Button, Avatar } from 'antd';
import PropTypes from 'prop-types';

const dummy = {
    isLoggedIn: true,
    imagePaths: [],
    mainPosts: [{
        User: {
            id: 1,
            nickname: 'zena',
        },
        content: '첫 게시글',
        img: '',
    }],
};

const PostCard = ({ post }) => {
    return (
        <Card
            key={+post.createdAt}
            cover={post.img && <img alt="example" src={post.img}/>}
            actions={[
                <Icon type="retweet" key="retweet" />,
                <Icon type="heart" key="heart" />,
                <Icon type="message" key="message" />,
                <Icon type="ellipsis" key="ellopsis" />,
            ]}
            extra={<Button>팔로우</Button>}
        >
            <Card.Meta
                avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                title={post.User.nickname}
                description={post.content}
            />

        </Card>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        img: PropTypes.string,
        createdAt: PropTypes.object,
    }),
};

export default PostCard;