import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR,
    LOGOUT
} from "../types";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null
};

export default function authReducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return { ...state, loading: false, user: action.payload };
        case LOGIN_ERROR:
        case REGISTER_ERROR:
            return { ...state, loading: false, error: action.payload };
        case LOGOUT:
            return { ...state, user: null };
        default:
            return state;
    }
}