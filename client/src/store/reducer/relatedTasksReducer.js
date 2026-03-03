import { RELATED_TASKS_REQUEST, RELATED_TASKS_SUCCESS, RELATED_TASKS_ERROR } from "../types";

const initialState = { tasks: [], loading: false, error: null, totalPages: 0 };

export default function relatedTasksReducer(state = initialState, action) {
    switch (action.type) {
        case RELATED_TASKS_REQUEST:
            return { ...state, loading: true, error: null };
        case RELATED_TASKS_SUCCESS:
            return { ...state, loading: false, tasks: action.payload.tasks, totalPages: action.payload.totalPages };
        case RELATED_TASKS_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}