import {
    EDIT_TASKS_REQUEST,
    EDIT_TASKS_SUCCESS,
    EDIT_TASKS_ERROR
} from "../types";

const initialState = {
    task: null,
    error: null
};

export default function editTaskReducer (state = initialState, action)  {
    switch (action.type) {
        case EDIT_TASKS_REQUEST:
            return {
                ...state,
                error: null
            };

        case EDIT_TASKS_SUCCESS:
            return {
                ...state,
                task: action.payload
            };

        case EDIT_TASKS_ERROR:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
};
