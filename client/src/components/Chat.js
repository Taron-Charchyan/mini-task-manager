import { useEffect, useState, useRef } from "react";
import styles from "../assets/css/Chat.module.css";
import api from "../api/Api";
import { useSocket } from "../context/SocketContext";

function Chat({ receiver, closeChat }) {
    const socket = useSocket();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const bottomRef = useRef(null);

    const senderId = currentUser._id;
    const receiverId = receiver._id;

    useEffect(() => {
        if (!socket) return;

        api.get("/chat/getChat", {
            params: { senderId, receiverId }
        }).then(res => {
            setMessages(res.data);
        });

        socket.emit("join_chat", { senderId, receiverId });

        socket.on("new_message", msg => {
            setMessages(prev => [...prev, msg]);
        });

        return () => {
            socket.off("new_message");
        };
    }, [receiverId, senderId, socket]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = e => {
        e.preventDefault();
        if (!text.trim() || !socket) return;

        socket.emit("send_message", { senderId, receiverId, text });
        setText("");
    };

    return (
        <div className={styles.chatWrapper}>
            <div className={styles.chatHeader}>
                <span>{receiver.name}</span>
                <button onClick={closeChat}>✕</button>
            </div>

            <div className={styles.chatMessages}>
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={m.sender === senderId
                            ? `${styles.message} ${styles.own}`
                            : styles.message
                        }
                    >
                        {m.message}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <form className={styles.chatInput} onSubmit={sendMessage}>
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Write message..."
                />
                <button>➤</button>
            </form>
        </div>
    );
}

export default Chat;