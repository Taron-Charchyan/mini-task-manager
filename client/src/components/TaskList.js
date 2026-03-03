import React, {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {useDispatch, useSelector} from "react-redux";
import {fetchTasks, relatedTasks} from "../store/thunks/taskThunks";
import AddNewTask from "./AddNewTask";
import EditTask from "./EditTask";
import ViewTask from "./ViewTask";
import DeleteTask from "./DeleteTask";
import Loader from "./Loader";
import taskStyles from '../assets/css/TaskList.module.css';
import paginationStyles from '../assets/css/Pagination.module.css';
import EmptyState from "./EmptyState";

function TaskList() {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("all");
    const [creator, setCreator] = useState("created");
    const { tasks, loading, totalPages } = useSelector((state) =>
        activeTab === "all" ? state.tasks : state.relatedTasks
    );

    const [page, setPage] = useState(0);
    const limit = 10;

    useEffect(() => {
        if (activeTab === "all") {
            dispatch(fetchTasks(page + 1, limit));
        } else {
            dispatch(relatedTasks(page + 1, limit, creator));
        }
    }, [dispatch, page, activeTab, creator]);

    const handlePageClick = (e) => setPage(e.selected);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setPage(0);
    };

    const handleCreatorChange = (value) => {
        setCreator(value);
        setPage(0);
    };

    const refreshTasks = () => {
        if (activeTab === "all") dispatch(fetchTasks(page + 1, limit));
        else dispatch(relatedTasks(page + 1, limit, creator));
    };

    if (loading) return <Loader />;

    return (
        <div className={taskStyles.tasksContainer}>
            <AddNewTask onTaskAdded={() => {
                if (activeTab === "all") {
                    dispatch(fetchTasks(page + 1, limit));
                } else {
                    dispatch(relatedTasks(page + 1, limit, creator));
                }
            }} />

            <div className={taskStyles.tabsContainer}>
                <button className={taskStyles.tabBtn} onClick={() => handleTabChange("all")} disabled={activeTab === "all"}>
                    All Tasks
                </button>
                <button className={taskStyles.tabBtn} onClick={() => handleTabChange("related")} disabled={activeTab === "related"}>
                    Related Tasks
                </button>
            </div>

            {activeTab === "related" && (
                <div className={taskStyles.filterContainer}>
                    <button className={taskStyles.filterBtn} onClick={() => handleCreatorChange("created")} disabled={creator === "created"}>
                        Created by me
                    </button>
                    <button className={taskStyles.filterBtn} onClick={() => handleCreatorChange("assigned")} disabled={creator === "assigned"}>
                        Assigned to me
                    </button>
                </div>
            )}

            {tasks.length === 0 ? (
                <EmptyState message="No tasks yet" />
            ) : (
                <>
                    <ul className={taskStyles.tasksList}>
                        {tasks.map(task => (
                            <li key={task._id} className={taskStyles.taskCard}>
                                <h4>{task.title}</h4>
                                <span className={`${taskStyles.status} ${
                                    task.status === 'done'
                                        ? taskStyles.done
                                        : taskStyles.pending
                                }`}>
                                    {task.status === 'done' ? 'Done' : 'Pending'}
                                </span>

                                <EditTask task={task} />
                                <ViewTask task={task} activeTab={activeTab} creator={creator} />
                                <DeleteTask task={task} onTaskDeleted={refreshTasks} />
                            </li>
                        ))}
                    </ul>

                    {totalPages > 1 && (
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
                </>
            )}
        </div>
    );
}

export default TaskList;