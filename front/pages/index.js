import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { loadMainPostsRequestAction } from "../reducers/post";

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMainPostsRequestAction);
  }, []);
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

export default Home;
