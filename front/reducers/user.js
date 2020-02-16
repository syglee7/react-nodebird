const dummyUser = {
    nickname: 'zena',
    Post: [],
    Followings: [],
    Followers: [],
    signUpData: {},

};

export const initialState = {
    isLoggedIn: false,
    user: null,
};

export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN'; // 액션의 이름
export const LOG_OUT = 'LOG_OUT';

export const signUpAction = (data) => {
    return {
        type: SIGN_UP,
        data: data,
    };
};

export const loginAction = (data) => {
    return {
        type: LOG_IN,
        data,
    }
};
export const logoutAction = {
    type: LOG_OUT,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                user: dummyUser,
                loginData: action.data,
            };
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        }

        case SIGN_UP: {
            return {
                ...state,
                signUpData: action.data,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
};