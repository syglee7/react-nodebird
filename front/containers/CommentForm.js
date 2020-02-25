import {Button, Form, Input} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import {addCommentRequestAction} from "../reducers/post";
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from "react-redux";

const CommentForm = ({ post }) => {
    const [commentText, setCommentText] = useState('');
    const { commentAdded, isAddingComment } = useSelector(state => state.post);
    const { me } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if (!me) {
            return alert('로그인이 필요합니다');
        }
        return dispatch(addCommentRequestAction({
            data: {
                postId: post.id,
                content: commentText,
            },
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
        <Form onSubmit={onSubmitComment}>
            <Form.Item>
                <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
        </Form>
    );
};

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
};

export default CommentForm;