import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {LOAD_MAIN_POSTS_REQUEST, loadMainPostsRequestAction} from "../reducers/post";

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const countRef = useRef([]);

  const onScroll = useCallback(() => {
    //            현재 위치(윈도우 제일 위 좌표값(스크롤 내린 거리), 윈도우 현재 화명 높이,  문서 전체 길이)
    //console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
      if (hasMorePost) {
        const lastId = mainPosts[mainPosts.length - 1].id;
        if (!countRef.current.includes(lastId)) {
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            lastId,
          });
          countRef.current.push(lastId);
        }
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
      {me && <PostForm />}
      {mainPosts.map((c) => {
        return (
            <PostCard key={c} post={c} />
        );
      })}
    </div>

  );
};

Home.getInitialProps = async (context) => {
  context.store.dispatch(loadMainPostsRequestAction);
};

export default Home;
