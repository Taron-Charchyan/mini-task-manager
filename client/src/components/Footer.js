import React from 'react';
import styles from '../assets/css/Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <span className={styles.logo}>Task<span>Manager</span></span>
                <p className={styles.copy}>© {new Date().getFullYear()} TaskManager. All rights reserved.</p>
                <div className={styles.links}>
                    <a href="https://www.linkedin.com/in/taron-charchyan" target="_blank" rel="noreferrer">LinkedIn</a>
                    <a href="mailto:charchyantaron@gmail.com">Contact</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;