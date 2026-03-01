import React, { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import Chat from "../components/Chat";
import Loader from "../components/Loader";
import styles from '../assets/css/Users.module.css';
import { useDispatch, useSelector } from "react-redux";
import { usersFetch } from "../store/thunks/usersThunks";
import EmptyState from "../components/EmptyState";
import { useSocket } from "../context/SocketContext";

function Users() {
    const dispatch = useDispatch();
    const socket = useSocket();
    const [user] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));
    const { users, loading } = useSelector(state => state.users);
    const [selectedUser, setSelectedUser] = useState(null);
    const [chatOpen, setChatOpen] = useState(false);

    useEffect(() => {
        dispatch(usersFetch());
    }, [dispatch]);

    const handleClick = (u) => {
        if (chatOpen && selectedUser?._id === u._id) {
            setSelectedUser(null);
            setChatOpen(false);
        } else {
            setSelectedUser(u);
            setChatOpen(true);
        }
    };

    if (loading) return <Loader />;

    return (
        <>
            {users.length === 0
                ? (
                    <div className={styles.emptyWrapper}>
                        <EmptyState message="There are no other users logged in at this time." />
                    </div>
                )
                : (
                    <div className={styles.usersContainer}>
                        {users.map(u => (
                            <div key={u._id} className={styles.userCard}>
                                <span>{u.name}</span>
                                <button onClick={() => handleClick(u)}>
                                    <FaPaperPlane />
                                </button>
                            </div>
                        ))}
                    </div>
                )
            }

            {selectedUser && socket && (
                <Chat
                    receiver={selectedUser}
                    closeChat={() => {
                        setSelectedUser(null);
                        setChatOpen(false);
                    }}
                />
            )}
        </>
    );
}

export default Users;