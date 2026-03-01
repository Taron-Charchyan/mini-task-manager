import {
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_ERROR
} from "../types";

const initialState = {
    tasks: [],
    loading: false,
    error: null,
    totalPages: 0,
};

export default function taskReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_TASKS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_TASKS_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: action.payload.tasks,
                totalPages: action.payload.totalPages,
            };

        case FETCH_TASKS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}
