import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import editTaskReducer from "./editTaskReducer";
import deleteTaskReducer from "./deleteTaskReducer";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";

export default combineReducers({
    tasks: taskReducer,
    editTask: editTaskReducer,
    deleteTask: deleteTaskReducer,
    auth: authReducer,
    users: usersReducer
});
