import React from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

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

const Home = () => {
    return(
        <>
            <div>
                {dummy.isLoggedIn && <PostForm />}
                {dummy.mainPosts.map((c) => {
                    return (
                        <PostCard key={c} post={c}/>
                    );
                })}
            </div>
        </>
    );
};

export default Home;