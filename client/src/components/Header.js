import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../assets/css/Header.module.css';
import UserDropdown from "./UserDropdown";

const Header = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    const userInfo = useSelector(state => state.auth.user);

    const closeMenu = () => setMenuIsOpen(false);
    const closeDropdown = () => setDropdownIsOpen(false);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <Link to="/" className={styles.navLogo} onClick={closeMenu}>
                    Task<span>Manager</span>
                </Link>

                <div className={`${styles.navMenu} ${menuIsOpen ? styles.active : ""}`}>
                    {userInfo && (
                        <>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
                                }
                                onClick={closeMenu}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/users"
                                className={({ isActive }) =>
                                    isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
                                }
                                onClick={closeMenu}
                            >
                                Users
                            </NavLink>
                            <p
                                onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
                                className={styles.navItem}
                            >
                                {userInfo.name}
                            </p>
                            {dropdownIsOpen && (
                                <UserDropdown
                                    userInfo={userInfo}
                                    closeDropdown={closeDropdown}
                                />
                            )}
                        </>
                    )}
                </div>

                <div className={styles.navHamburger} onClick={() => setMenuIsOpen(!menuIsOpen)}>
                    <span className={`${styles.bar} ${menuIsOpen ? styles.active : ""}`}></span>
                    <span className={`${styles.bar} ${menuIsOpen ? styles.active : ""}`}></span>
                    <span className={`${styles.bar} ${menuIsOpen ? styles.active : ""}`}></span>
                </div>
            </div>
        </nav>
    );
};

export default Header;