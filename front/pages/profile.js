import React, {useCallback, useEffect} from 'react';
import {
  Button, List, Icon, Card,
} from 'antd';
import NicknameEditForm from '../containers/NicknameEditForm';
import {
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWINGS_REQUEST,
    REMOVE_FOLLOWER_REQUEST,
    UNFOLLOW_USER_REQUEST
} from "../reducers/user";
import {loadUserPostsRequestAction} from "../reducers/post";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../containers/PostCard";
import Router from "next/router";
import FollowList from "../components/FollowList";

const Profile = () => {
    const dispatch = useDispatch();
    const { me, followerList, followingList, hasMoreFollower, hasMoreFollowing } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);


    useEffect(() => {
        if (!me) {
            alert('메인 페이지로 이동');
            Router.push('/');
        }
    }, []);

    const onUnfollow = useCallback(userId => () => {
        dispatch({
            type: UNFOLLOW_USER_REQUEST,
            data: userId,
        });
    }, []);

    const onRemoveFollower = useCallback(userId => () => {
        dispatch({
            type: REMOVE_FOLLOWER_REQUEST,
            data: userId
        })
    }, []);

    const loadMoreFollowings = useCallback(() => {
        dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,
            offset: followingList.length,
        });
    }, [followingList.length]);

    const loadMoreFollowers = useCallback(() => {
        dispatch({
            type: LOAD_FOLLOWERS_REQUEST,
            offset: followerList.length,
        });
    }, [followerList.length]);

    return (
      <div>
        <NicknameEditForm />
        <FollowList
            header="팔로잉 목록"
            hasMore={hasMoreFollowing}
            onClickMore={loadMoreFollowings}
            data={followingList}
            onClickStop={onUnfollow}
        />
        <FollowList
          header="팔로워 목록"
          hasMore={hasMoreFollower}
          onClickMore={loadMoreFollowers}
          data={followerList}
          onClickStop={onRemoveFollower}
        />
        <div>
          {mainPosts.map(c => (
              <PostCard key={c.id} post={c} />
          ))}
        </div>
      </div>
    )
};

Profile.getInitialProps = async (context) => {
    const state = context.store.getState();
    // 이 직전에 LOAD_USERS_REQUEST
    context.store.dispatch({
        type: LOAD_FOLLOWERS_REQUEST,
        data: state.user.me && state.user.me.id,
    });
    context.store.dispatch({
        type: LOAD_FOLLOWINGS_REQUEST,
        data: state.user.me && state.user.me.id,
    });
    context.store.dispatch(loadUserPostsRequestAction({
        data: state.user.me && state.user.me.id,
    }));

    // 이쯤에서 LOAD_USERS_SUCCESS 되어서 me 가 생김
};
export default Profile;
