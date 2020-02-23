import React, {useCallback, useEffect} from 'react';
import {
  Button, List, Icon, Card,
} from 'antd';
import NicknameEditForm from '../components/NickNameEditForm';
import {
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWINGS_REQUEST,
    REMOVE_FOLLOWER_REQUEST,
    UNFOLLOW_USER_REQUEST
} from "../reducers/user";
import {loadUserPostsRequestAction} from "../reducers/post";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../components/PostCard";

const Profile = () => {
    const dispatch = useDispatch();
    const { me, followerList, followingList } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);

    useEffect(() => {
        if (me) {
            dispatch({
                type: LOAD_FOLLOWERS_REQUEST,
                data: me.id,
            });
            dispatch({
                type: LOAD_FOLLOWINGS_REQUEST,
                data: me.id,
            });
            dispatch({
                type: loadUserPostsRequestAction({
                    data: me.id,
                })
            });
        }
    }, [me && me.id]);

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

    return (
      <div>
        <NicknameEditForm />
        <List
          style={{ marginBottom: '20px' }}
          grid={{ gutter: 4, xs: 2, md: 3 }}
          size="small"
          header={<div>팔로잉 목록</div>}
          loadMore={<Button style={{ width: '100%' }}>더보기</Button>}
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
          loadMore={<Button style={{ width: '100%' }}>더보기</Button>}
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
                  <PostCard key={+c.createdAt} post={c} />
              ))}
          </div>
      </div>
    )
};

export default Profile;
