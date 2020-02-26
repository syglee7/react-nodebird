import React from 'react';
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {LOAD_POST_REQUEST} from "../reducers/post";
import {backUrl} from "../config/config";

const Post = ({ id }) => {
    const { singlePost } = useSelector(state => state.post);
    return (
        <>
            <Helmet
                title={`${singlePost.User.nickname}님의 글`}
                description={singlePost.content}
                meta={[{ // 헤드태그
                    name: 'description', content: singlePost.content,
                }, {
                    property: 'og:title', content: `${singlePost.User.nickname}님의 게시글`
                }, {
                    property: 'og:description', content: singlePost.content,
                }, {
                    property: 'og:image', content: singlePost.Images[0] && `http://api.zenaislee.site/${singlePost.Images[0].src}`,
                }, {
                    property: 'og:url', content: `http://zenaislee.site/post/${id}`,
                }]}
            />
            <div>{singlePost.content}</div>
            <div>{singlePost.User.nickname}</div>
            <div>{singlePost.Images[0] && <img src={`${backUrl}/${singlePost.Images[0].src}`} />} </div>
        </>
    );
};

Post.getInitialProps = async (context) => {
    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.query.id,
    });

    return { id: parseInt(context.query.id, 10) };
};

Post.proptypes = {
    id: PropTypes.number.isRequired,
};

export default Post;