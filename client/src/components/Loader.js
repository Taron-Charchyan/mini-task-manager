import React from 'react';
import styles from '../assets/css/Loader.module.css';

function Loader() {
    return (
        <div className={styles.container}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}

export default Loader;