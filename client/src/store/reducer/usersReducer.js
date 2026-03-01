import {
    USERS_REQUEST,
    USERS_SUCCESS,
    USERS_ERROR,
} from "../types";

const initialState = {
    users: [],
    loading: false,
    error: null
};

export default function loginReducer(state = initialState, action) {
    switch(action.type) {
        case USERS_REQUEST:
            return { ...state, loading: true, error: null };
        case USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload };
        case USERS_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
