import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import {LOAD_HASHTAG_POSTS_REQUEST, loadHashTagPostsRequestAction} from "../reducers/post";
import PostCard from "../components/PostCard";

const Hashtag = ({ tag }) => {
    const dispatch = useDispatch();
    const { mainPosts, hasMorePost } = useSelector(state => state.post);

    const onScroll = useCallback(() => {
        //            현재 위치(윈도우 제일 위 좌표값(스크롤 내린 거리), 윈도우 현재 화명 높이,  문서 전체 길이)
        //console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if (hasMorePost) {
                dispatch(dispatch({
                    type: LOAD_HASHTAG_POSTS_REQUEST,
                    lastId: mainPosts[mainPosts.length - 1].id,
                    data: tag,
                }));
            }
        }
    }, [hasMorePost, mainPosts.length]);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [mainPosts.length]);


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