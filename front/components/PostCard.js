import React, {useCallback, useEffect, useState} from 'react';
import {Card, Icon, Button, Avatar, Input, List, Comment, Form} from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {addCommentRequestAction} from "../reducers/post";

const PostCard = ({ post }) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [commentText, setCommentText] = useState('');
    const { me } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { commentAdded, isAddingComment } = useSelector(state => state.post);

    const onToggleComment = useCallback(() => {
        setCommentFormOpened(prev => !prev);

    }, []);

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if (!me) {
            return alert('로그인이 필요합니다');
        }
        return dispatch(addCommentRequestAction({
            postId: post.id,
        }));
    }, [me && me.id]);

    useEffect(() => {
        if (commentAdded) {
            setCommentText('');
        }
    }, [commentAdded]);

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, []);

    return (
        <div>
            <Card
              key={+post.createdAt}
              cover={post.img && <img alt="example" src={post.img} />}
              actions={[
                <Icon type="retweet" key="retweet" />,
                <Icon type="heart" key="heart" />,
                <Icon type="message" key="message" onClick={onToggleComment}/>,
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
            {commentFormOpened && (
                <>
                    <Form onSubmit={onSubmitComment}>
                        <Form.Item>
                            <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
                    </Form>
                    <List
                        header={`${post.Comments ? post.Comments.length : 0} 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments || []}
                        renderItem={item => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </>
            )}
        </div>
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
