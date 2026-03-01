import React, {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {useDispatch, useSelector} from "react-redux";
import {fetchTasks} from "../store/thunks/taskThunks";
import AddNewTask from "./AddNewTask";
import EditTask from "./EditTask";
import ViewTask from "./ViewTask";
import DeleteTask from "./DeleteTask";
import Loader from "./Loader";
import taskStyles from '../assets/css/TaskList.module.css';
import paginationStyles from '../assets/css/Pagination.module.css';

function TaskList() {
    const dispatch = useDispatch();
    const {tasks, loading, totalPages} = useSelector((state) => state.tasks);
    const [page, setPage] = useState(0);
    const limit = 10;

    useEffect(() => {
        if (page >= totalPages) setPage(totalPages - 1 >= 0 ? totalPages - 1 : 0);
        dispatch(fetchTasks(page + 1, limit));
    }, [dispatch, page, totalPages]);

    const handlePageClick = (e) => setPage(e.selected);
    const refreshTasks = () => dispatch(fetchTasks(page + 1, limit));

    if (loading) return <Loader/>;

    return (
        <div className={taskStyles.tasksContainer}>
            {tasks.length === 0 && <p className={taskStyles.empty}>No tasks yet</p>}

            <AddNewTask onTaskAdded={refreshTasks}/>

            <ul className={taskStyles.tasksList}>
                {tasks.map(task => (
                    <li key={task._id} className={taskStyles.taskCard}>
                        <h4>{task.title}</h4>
                        <span className={`${taskStyles.status} ${task.status === 'done' ? taskStyles.done : taskStyles.pending}`}>
                                {task.status === 'done' ? 'Done' : 'Pending'}
                        </span>
                        <EditTask task={task} onTaskUpdated={refreshTasks}/>
                        <ViewTask task={task}/>
                        <DeleteTask task={task} onTaskDeleted={refreshTasks}/>
                    </li>
                ))}
            </ul>

            {tasks.length > 0 && (
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="→"
                    previousLabel="←"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={totalPages}
                    forcePage={page}
                    containerClassName={paginationStyles.pagination}
                    pageClassName={paginationStyles.pageItem}
                    pageLinkClassName={paginationStyles.pageLink}
                    previousClassName={`${paginationStyles.pageItem} ${paginationStyles.previous}`}
                    nextClassName={`${paginationStyles.pageItem} ${paginationStyles.next}`}
                    activeClassName={paginationStyles.active}
                    disabledClassName={paginationStyles.disabled}
                />
            )}
        </div>
    );
}

export default TaskList;