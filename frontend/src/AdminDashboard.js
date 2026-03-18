import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";

function AdminDashboard() {
    const [data, setData] = useState({
        totalChats: 0,
        negativeCount: 0
    });
    
    
    useEffect(() => {
    axios.get("http://localhost:8000/api/chat/analytics")
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, []);
    
    
    return (
        <div className="admin-container">
            <div className="admin-card">
                <h2 className="admin-title">Admin Analytics Dashboard</h2>
            
            <div className="stat-box">  
                <h3>Total Chats</h3>
                <p>{data.totalChats}</p>
            </div>
            
            <div className="stat-box negative">
                <h3>Negative Messages</h3>
                <p>{data.negativeCount}</p>
            </div>
        </div>
    </div>
);
}

export default AdminDashboard;