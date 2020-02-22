import React, {useCallback, useEffect, useState} from 'react';
import {Card, Icon, Button, Avatar, Input, List, Comment, Form} from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {addCommentRequestAction, loadCommentRequestAction} from "../reducers/post";

const PostCard = ({ post }) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [commentText, setCommentText] = useState('');
    const { me } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { commentAdded, isAddingComment } = useSelector(state => state.post);

    const onToggleComment = useCallback(() => {
        setCommentFormOpened(prev => !prev);
        if (!commentFormOpened) {
            dispatch(loadCommentRequestAction({
                data: post.id,
            }));
        }
    }, [commentFormOpened]);

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if (!me) {
            return alert('로그인이 필요합니다');
        }
        return dispatch(addCommentRequestAction({
            postId: post.id,
            content: commentText,
        }));
    }, [me && me.id, commentText]);

    useEffect(() => {
        if (commentAdded) {
            setCommentText('');
        }
    }, [commentAdded === true]);

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
                avatar={<Link href={{ pathname: '/user', query: { id: post.User.id } }} as={`/user/${post.User.id}`}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
                title={post.User.nickname}
                description={(
                    <div>
                        {post.content.split(/(#[^\s]+)/g).map((v) => {
                            if (v.match(/#[^\s]+/)) {
                                return (
                                    <Link href={{ pathname: '/hashtag' , query: { tag: v.slice(1)}}} as={`/hashtag/${v.slice(1)}`}  key={v}><a>{v}</a></Link>
                                );
                            }
                            return v;
                        })}
                    </div>
                )}
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
                                    avatar={<Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}><Avatar>{item.User.nickname[0]}</Avatar></Link>}
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
    createdAt: PropTypes.string,
  }),
};

export default PostCard;
