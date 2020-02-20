import {
  all, fork, takeEvery, call, put, delay,
} from 'redux-saga/effects';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
} from '../reducers/user';

function loginAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/login');
}

function* login() {
  try {
    // yield call(loginAPI); // call 은 함수 동기적 호출
    yield delay(2000);
    yield put({ // put 은 액션 dispatch 동일
      type: LOG_IN_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}


function signUpAPI() {
  // 서버에 요청을 보내는 부분
}

function* signUp() {
  try {
    yield delay(2000);
    // yield call(signUpAPI); // call 은 함수 동기적 호출
    throw new Error('에러에러에러');
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

export default function* userSaga() {
  yield all([
    fork(watchLogin), // fork 는 함수 비동기적 호출
    fork(watchSignUp),
  ]);
}
