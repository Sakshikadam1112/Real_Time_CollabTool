import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  './Auth.css';
import DNav from './dNav';

const DocumentForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem('user'));
                // Extract the token from the parsed object
                const token = user ? user.token : null;
            const { data } = await axios.post('http://localhost:5000/api/documents', { title, content }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate(`/document/${data._id}`,{ state: { message: 'Document created successfully!' } });
        } catch (error) {
            console.error('Failed to create document:', error);
        }
    };

    return (
        <>
        <DNav/>
        <div className="create-document-container">
    <h2 className="create-document-title">Create New Document</h2>
    <form onSubmit={handleSubmit} className="create-document-form">
        <div className="form-group">
            <label htmlFor="title" className="form-label">Title</label>
            <input
                type="text"
                className="form-input"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="content" className="form-label">Content</label>
            <textarea
                className="form-textarea"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>
        </div>
        <button type="submit" className="form-submit-btn">Create</button>
    </form>
</div>
</>
    );
};

export default DocumentForm;
