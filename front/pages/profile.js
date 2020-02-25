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
        <List
          style={{ marginBottom: '20px' }}
          grid={{ gutter: 4, xs: 2, md: 3 }}
          size="small"
          header={<div>팔로잉 목록</div>}
          loadMore={hasMoreFollowing && <Button style={{ width: '100%' }} onClick={loadMoreFollowings}>더보기</Button>}
          bordered
          dataSource={followingList}
          renderItem={(item) => (
            <List.Item style={{ marginTop: '20px' }}>
              <Card actions={[<Icon key="stop" type="stop" onClick={onUnfollow(item.id)}/>]}>
                  <Card.Meta description={item.nickname} />
              </Card>
            </List.Item>
          )}
        />
        <List
          style={{ marginBottom: '20px' }}
          grid={{ gutter: 4, xs: 2, md: 3 }}
          size="small"
          header={<div>팔로워 목록</div>}
          loadMore={hasMoreFollower &&<Button style={{ width: '100%' }} onClick={loadMoreFollowers}>더보기</Button>}
          bordered
          dataSource={followerList}
          renderItem={(item) => (
            <List.Item style={{ marginTop: '20px' }}>
              <Card actions={[<Icon key="stop" type="stop" onClick={onRemoveFollower(item.id)}/>]}>
                  <Card.Meta description={item.nickname} />
              </Card>
            </List.Item>
          )}
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
