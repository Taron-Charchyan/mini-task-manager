import React, {useState} from 'react';
import styles from '../assets/css/ViewTask.module.css';
import {FaEye} from "react-icons/fa";
import EmptyState from "./EmptyState";

function ViewTask({task, activeTab, creator}) {
    const [openViewTask, setOpenViewTask] = useState(false);

    if (!task) return <EmptyState message={"Task not found"}/>;

    const showCreatedBy = activeTab === "all" || (activeTab === "related" && creator === "assigned");
    const showAssignedTo = activeTab === "all" || (activeTab === "related" && creator === "created");

    return (
        <>
            <FaEye
                className={styles.viewIcon}
                onClick={() => setOpenViewTask(true)}
            />

            {openViewTask && (
                <div className={styles.modalOverlay} onClick={() => setOpenViewTask(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h2 className={styles.modalTitle}>Task details</h2>

                        <div className={styles.modalRow}>
                            <span className={styles.modalLabel}>Title</span>
                            <span className={styles.modalValue}>{task.title}</span>
                        </div>

                        <div className={styles.modalRow}>
                            <span className={styles.modalLabel}>About task</span>
                            <span className={styles.modalValue}>{task.description || '—'}</span>
                        </div>

                        {showCreatedBy && (
                            <div className={styles.modalRow}>
                                <span className={styles.modalLabel}>Created by</span>
                                <span className={styles.modalValue}>{task.createdBy?.name || '—'}</span>
                            </div>
                        )}

                        {showAssignedTo && (
                            <div className={styles.modalRow}>
                                <span className={styles.modalLabel}>Assigned to</span>
                                <span className={styles.modalValue}>{task.assignedTo?.name || '—'}</span>
                            </div>
                        )}

                        <div className={styles.modalRow}>
                            <span className={styles.modalLabel}>Task status</span>
                            <span className={`${styles.taskStatus} ${task.status === 'done' ? styles.done : styles.pending}`}>
                                {task.status === 'done' ? 'Done' : 'Pending'}
                            </span>
                        </div>

                        <button className={styles.modalOkBtn} onClick={() => setOpenViewTask(false)}>
                            OK
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ViewTask;