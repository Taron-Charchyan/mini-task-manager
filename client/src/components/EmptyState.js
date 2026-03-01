import React from 'react';
import styles from '../assets/css/EmptyState.module.css';

function EmptyState({ message = "Empty state" }) {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>👥</div>
            <h3 className={styles.title}>Nothing here yet</h3>
            <p className={styles.message}>{message}</p>
        </div>
    );
}

export default EmptyState;