// authReducer.js
const initialState = {
    isAuthenticated: false,
    token: null,
    email: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                email: action.payload.email,
            };
        case 'LOGOUT':
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default authReducer;
