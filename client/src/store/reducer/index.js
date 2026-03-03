import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import editTaskReducer from "./editTaskReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import relatedTasksReducer from "./relatedTasksReducer";

export default combineReducers({
    tasks: taskReducer,
    editTask: editTaskReducer,
    auth: authReducer,
    users: usersReducer,
    relatedTasks: relatedTasksReducer,
});
