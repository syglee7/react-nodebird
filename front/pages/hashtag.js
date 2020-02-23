import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { loadHashTagPostsRequestAction } from "../reducers/post";
import PostCard from "../components/PostCard";

const Hashtag = ({ tag }) => {
    const dispatch = useDispatch();
    const { mainPosts } = useSelector(state => state.post);

    return (
        <div>
            {mainPosts.map(c => (
                <PostCard key={+c.createdAt} post={c} />
            ))}
        </div>
    );
};

Hashtag.propTypes = {
    tag: PropTypes.string.isRequired,
};

// 제일 먼저 작동됨
Hashtag.getInitialProps = async (context) => {
    const tag = context.query.tag;
    console.log('hashtag getInitialProps', tag);
    context.store.dispatch(loadHashTagPostsRequestAction({
        data: tag,
    }));
    return { tag };
};

export default Hashtag;