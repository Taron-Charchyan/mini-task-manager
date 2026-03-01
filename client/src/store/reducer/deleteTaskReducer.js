import {
    DELETE_TASKS_REQUEST,
    DELETE_TASKS_SUCCESS,
    DELETE_TASKS_ERROR
} from "../types";

const initialState = {
    loading: false,
    error: null
};

export default function deleteTaskReducer (state = initialState, action)  {
    switch (action.type) {
        case DELETE_TASKS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case DELETE_TASKS_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case DELETE_TASKS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
