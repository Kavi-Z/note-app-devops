import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">My Note App</h1>
        <p className="landing-subtitle">Organize your notes efficiently and beautifully</p>
        <div className="landing-buttons">
          <button className="btn login-btn" onClick={() => navigate('/login')}>
            <FaSignInAlt className="icon" /> Login
          </button>
          <button className="btn signup-btn" onClick={() => navigate('/signup')}>
            <FaUserPlus className="icon" /> Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
