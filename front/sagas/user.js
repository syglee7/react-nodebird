import {
  all, fork, takeEvery, call, put
} from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOG_OUT_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  EDIT_NICKNAME_SUCCESS,
  EDIT_NICKNAME_FAILURE,
  EDIT_NICKNAME_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
} from '../reducers/user';

function logInAPI(loginData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/login', loginData, {
    withCredentials: true,
  });
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data); // call 은 함수 동기적 호출
    yield put({ // put 은 액션 dispatch 동일
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
      error: e,
    });
  }
}

function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}


function loadUserAPI(userId) {
  // 서버에 요청을 보내는 부분
  return axios.get(userId ? `/user/${userId}` : '/user/', {
    withCredentials: true,
  });
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data); // call 은 함수 동기적 호출
    yield put({ // put 은 액션 dispatch 동일
      type: LOAD_USER_SUCCESS,
      data: result.data,
      me: !action.data, // 유저아이디가 없으면 내정보
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOAD_USER_FAILURE,
      error: e,
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}


function logOutAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/user/logout', {}, {
    withCredentials: true,
  });
}

function* logOut() {
  try {
    yield call(logOutAPI); // call 은 함수 동기적 호출
    yield put({ // put 은 액션 dispatch 동일
      type: LOG_OUT_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE,
      error: e,
    });
  }
}

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}

function signUpAPI(signUpData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user', signUpData);
}

function* signUp(action) {
  try {
    // yield delay(2000);
    yield call(signUpAPI, action.data); // call 은 함수 동기적 호출
    //throw new Error('에러에러에러');
    yield put({ // put 은 액션 dispatch 동일
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function followAPI(userId) {
  // 서버에 요청을 보내는 부분
  return axios.post(`/user/${userId}/follow`,{}, {
    withCredentials: true,
  });
}

function* follow(action) {
  try {
    // yield delay(2000);
    const result = yield call(followAPI, action.data); // call 은 함수 동기적 호출
    //throw new Error('에러에러에러');
    yield put({ // put 은 액션 dispatch 동일
      type: FOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: FOLLOW_USER_FAILURE,
      error: e,
    });
  }
}

function* watchFollow() {
  yield takeEvery(FOLLOW_USER_REQUEST, follow);
}

function unFollowAPI(userId) {
  // 서버에 요청을 보내는 부분
  return axios.delete(`/user/${userId}/follow`, {
    withCredentials: true,
  });
}

function* unFollow(action) {
  try {
    // yield delay(2000);
    const result = yield call(unFollowAPI, action.data); // call 은 함수 동기적 호출
    //throw new Error('에러에러에러');
    yield put({ // put 은 액션 dispatch 동일
      type: UNFOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: UNFOLLOW_USER_FAILURE,
      error: e,
    });
  }
}

function* watchUnFollow() {
  yield takeEvery(UNFOLLOW_USER_REQUEST, unFollow);
}

function loadFollowersAPI(userId) {
  // 서버에 요청을 보내는 부분
  return axios.get(`/user/${userId}/followers`, {
    withCredentials: true,
  });
}

function* loadFollowers(action) {
  try {
    // yield delay(2000);
    const result = yield call(loadFollowersAPI, action.data); // call 은 함수 동기적 호출
    //throw new Error('에러에러에러');
    yield put({ // put 은 액션 dispatch 동일
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadFollowers() {
  yield takeEvery(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function loadFollowingsAPI(userId) {
  // 서버에 요청을 보내는 부분
  return axios.get(`/user/${userId}/followings`, {
    withCredentials: true,
  });
}

function* loadFollowings(action) {
  try {
    // yield delay(2000);
    const result = yield call(loadFollowingsAPI, action.data); // call 은 함수 동기적 호출
    //throw new Error('에러에러에러');
    yield put({ // put 은 액션 dispatch 동일
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadFollowings() {
  yield takeEvery(LOAD_FOLLOWINGS_REQUEST, loadFollowings);

}

function removeFollowerAPI(userId) {
  // 서버에 요청을 보내는 부분
  return axios.delete(`/user/${userId}/follower`, {
    withCredentials: true,
  });
}

function* removeFollower(action) {
  try {
    // yield delay(2000);
    const result = yield call(removeFollowerAPI, action.data); // call 은 함수 동기적 호출
    //throw new Error('에러에러에러');
    yield put({ // put 은 액션 dispatch 동일
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: e,
    });
  }
}

function* watchRemoveFollower() {
  yield takeEvery(REMOVE_FOLLOWER_REQUEST, removeFollower);

}

function editNicknameAPI(nickname) {
  // 서버에 요청을 보내는 부분
  return axios.patch(`/user/nickname`, {nickname}, {
    withCredentials: true,
  });
}

function* editNickname(action) {
  try {
    const result = yield call(editNicknameAPI, action.data); // call 은 함수 동기적 호출
    yield put({ // put 은 액션 dispatch 동일
      type: EDIT_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: EDIT_NICKNAME_FAILURE,
      error: e,
    });
  }
}

function* watchEditNickname() {
  yield takeEvery(EDIT_NICKNAME_REQUEST, editNickname);

}


export default function* userSaga() {
  yield all([
    fork(watchLogIn), // fork 는 함수 비동기적 호출
    fork(watchLogOut),
    fork(watchLoadUser),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchRemoveFollower),
    fork(watchEditNickname),
  ]);
}
