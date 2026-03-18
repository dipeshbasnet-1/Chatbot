import React from "react";
import Chatbot from "./Chatbot";
import AdminDashboard from "./AdminDashboard";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        
        <div className="nav-box">
          <Link to="/" className="nav-btn">💬 Chat</Link>
          <Link to="/admin" className="nav-btn">📊 Admin</Link>
        </div>
        
        <Routes>
          <Route path="/" element={<Chatbot />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;