import { all, fork, takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from "../reducers/user";

function loginAPI() {
    // 서버에 요청을 보내는 부분
}

function* login() {
    try {
        yield call(loginAPI); // call 은 함수 동기적 호출. 순서대로 실행함
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

function* watchSignUp() {

}

function* watchLogin() {
    // takeLatest 는 이전 요청이 끝나지 않은게 있다면 이전 요청을 취소함.
    yield takeLatest(LOG_IN, login);
}

/*function* watchHello() {
    yield takeEvery(HELLO_SAGA, function*() {
       console.log(1);
       console.log(2);
       console.log(3);
       console.log(4);
    });
}

function* watchHello() {
    while(true) {
        yield take(HELLO_SAGA);
        console.log(1);
        console.log(2);
        console.log(3);
        console.log(4);
    }
}*/

export default function* userSaga() {
    yield all([
        fork(watchLogin), // fork 는 함수 비동기적 호출
    ]);
}