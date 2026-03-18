import React, { useState } from "react";
import axios from "axios";
import "./chatbot.css";

function Chatbot() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    
    const sendMessage = async () => {
        if (!message) return;
        
        try {
            const res = await axios.post(
                "http://localhost:8000/api/chat/message",
                { userMessage: message }
            );
            
            
            setChat([
                ...chat,
                { user: message },
                { bot: res.data.reply }
            ]);
            
            setMessage("");
        } catch (error) {
            console.log(error);
            alert("Server error");
        }
};

return (
    <div className="chat-container">
        <div className="chat-card">
            <h2 className="chat-title">💬 Customer Support Chatbot</h2>
        
        <div className="chat-box">
            {chat.map((c, i) => (
                <div key={i}>
                    {c.user && <div className="user-msg">{c.user}</div>}
                    {c.bot && <div className="bot-msg">{c.bot}</div>}
                </div>
            ))}
            {chat.length === 0 && <p className="placeholder">Welcome To Dipesh's Chatbot</p>}
        </div>
        
        <div className="input-area">
            <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>
    </div>
    );
}

export default Chatbot;

