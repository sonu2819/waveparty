import { useEffect, useRef, useState } from "react";
import { getUserData } from "../utils/userUtils";
import VoiceChat from "../components/VoiceChat";
import { db } from "../firebase";
import { FiSend } from "react-icons/fi";

import {
  ref,
  push,
  onValue,
  set,
  onDisconnect,
} from "firebase/database";

export default function Chat({ roomId }) {

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  const userData = getUserData();
  const userId = userData.userId;

  const [userName, setUserName] = useState(userData.userName);

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(userData.userName);

  // =========================
  // MESSAGES
  // =========================
  useEffect(() => {
    if (!roomId) return;

    const msgRef = ref(db, `rooms/${roomId}/messages`);

    const unsub = onValue(msgRef, (snap) => {
      const data = snap.val();

      if (!data) {
        setMessages([]);
        return;
      }

      const list = Object.entries(data).map(([id, msg]) => ({
        id,
        ...msg,
      }));

      list.sort((a, b) => a.time - b.time);

      setMessages(list);
    });

    return () => unsub();
  }, [roomId]);

  // =========================
  // AUTO SCROLL
  // =========================
  useEffect(() => {
    const el = messagesEndRef.current;

    if (el) {
      el.parentElement.scrollTop =
        el.parentElement.scrollHeight;
    }
  }, [messages]);

  // =========================
  // USERS / PRESENCE
  // =========================
  useEffect(() => {
    if (!roomId) return;

    const userRef = ref(db, `rooms/${roomId}/users/${userId}`);

    // ONLINE
    set(userRef, {
      id: userId,
      name: userName,
      online: true,
      speaking: false,
    });

    // OFFLINE
    onDisconnect(userRef).set({
      id: userId,
      name: userName,
      online: false,
      speaking: false,
    });

    const usersRef = ref(db, `rooms/${roomId}/users`);

    const unsub = onValue(usersRef, (snap) => {
      const data = snap.val();

      if (!data) {
        setUsers([]);
        return;
      }

      // ✅ SAFE + CONSISTENT STRUCTURE
      setUsers(
        Object.entries(data).map(([id, value]) => ({
          id,
          name: value?.name || "User",
          online: value?.online ?? false,
          speaking: value?.speaking ?? false,
        }))
      );
    });

    return () => unsub();
  }, [roomId, userId, userName]);

  // =========================
  // SEND MESSAGE
  // =========================
  const sendMessage = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    push(ref(db, `rooms/${roomId}/messages`), {
      text: input,
      user: userName,
      userId,
      time: Date.now(),
    });

    setInput("");
  };

  // =========================
  // SAVE USERNAME
  // =========================
  const saveName = () => {
    const cleanName = newName.trim();

    if (!cleanName) {
      setEditingName(false);
      return;
    }

    localStorage.setItem("vibe_username", cleanName);
    setUserName(cleanName);

    const userRef = ref(db, `rooms/${roomId}/users/${userId}`);

    set(userRef, {
      id: userId,
      name: cleanName,
      online: true,
      speaking: false,
    });

    setEditingName(false);
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="chat-box">

      {/* HEADER */}
      <div className="chat-header">
        LIVE CHAT
        
      </div>

      {/* USERS */}
      <div className="chat-users">

        {users.map((u) => (
          <div key={u.id} className="voice-user">

            {/* AVATAR */}
            <div className={`user-avatar ${u.speaking ? "speaking" : ""}`}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="#ffffff"
              >
                <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 3.134-7 7h14c0-3.866-3.134-7-7-7z"/>
              </svg>
            </div>

            {/* NAME + STATUS DOT (FIXED) */}
           <div className="user-name-wrapper stable-name-wrapper">

  <div className="name-capsule">

              <span className={`status-dot ${u.online ? "online" : "offline"}`}></span>

              {u.id === userId ? (
                editingName ? (
                  <input
                    className="edit-name-input"
                    value={newName}
                    autoFocus
                    onChange={(e) => setNewName(e.target.value)}
                    onBlur={saveName}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveName();
                    }}
                  />
                ) : (
                  <span
                    className="editable-name"
                    onClick={() => setEditingName(true)}
                  >
                    {u.name}
                  </span>
                )
              ) : (
                <span className="user-name">{u.name}</span>
              )}

            </div>

          </div> </div>
        ))}

       
        
      </div>

      {/* MESSAGES */}
      <div className="chat-messages">

        {messages.map((m) => (
          <div
            key={m.id}
            className={`chat-message ${
              m.userId === userId
                ? "my-message"
                : "other-message"
            }`}
          >
            {m.text}
          </div>
        ))}

        <div ref={messagesEndRef} />

      </div>

      {/* INPUT */}
      <form onSubmit={sendMessage}>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="message..."
        />
<div className="chat-right-controls">
          <VoiceChat roomId={roomId} />
        </div>
        <button className="send-btn">
  <FiSend />
</button>


      </form>

    </div>
  );
}