export const initialState = {
    mainPosts: [{
        User: {
            id: 1,
            nickname: 'zena',
        },
        content: '첫 번째 게시글',
        img: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
    }],
    imagePaths: [],
};

export const ADD_POST = 'ADD_POST';
export const ADD_DUMMY = 'ADD_DUMMY';

export const addPost = {
    type: ADD_POST,
};

export const addDummy = {
    type: ADD_DUMMY,
    data: {
        content: 'Hello',
        UserId: 1,
        User: {
            nickname: 'zena',
        },
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
            };
        }
        case ADD_DUMMY: {
            return {
                ...state,
                mainPosts: [action.data, ...state.mainPosts],
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};