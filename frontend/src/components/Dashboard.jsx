import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
import DNav from './dNav';

const Dashboard = () => {
    const [documents, setDocuments] = useState([]);
    const [username, setUserName] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                console.log("User from localStorage:", user);
                const token = user?.token;
                setUserName(user?.name);
                console.log(username)
                console.log("Token from user object:", token);
                
                if (!token) {
                    throw new Error("Token is missing!");
                }
    
                const { data } = await axios.get('http://localhost:5000/api/documents', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDocuments(data);
            } catch (error) {
                console.error('Failed to fetch documents:', error.response?.data || error.message);
                navigate('/');
            }
        };
        fetchDocuments();
    }, [navigate]);
    

    return (
        <>
        <DNav/>
<div className="dashboard-container">
    <h2 className="dashboard-title">Welcome {username}....</h2>
    <div className="dashboard-grid">
        {documents.map((doc) => (
            <div key={doc._id} className="dashboard-card">
                <h5 className="dashboard-card-title">{doc.title}</h5>
                <p className="dashboard-card-text">Created on: {new Date(doc.createdAt).toLocaleDateString()}</p>
                <Link to={`/document/${doc._id}`} className="dashboard-btn">Open Document</Link>
            </div>
        ))}
    </div>
    <div className="dashboard-footer">
        <button className="dashboard-create-btn" onClick={() => navigate('/document/new')}>
            Create New Document
        </button>
    </div>
</div>
</>
);
};

export default Dashboard;