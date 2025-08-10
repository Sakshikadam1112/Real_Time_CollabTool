import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpg from './components/Landingpg'
import Login from './components/Login'
import './App.css';
import Register from './components/Register';
import DocumentForm from './components/DocumentForm';
import DocumentDetails from './components/DocumentDetails';
import Dashboard from './components/Dashboard';
const App = () => {

  return (

    <>

      <Router>
        <Routes>
          <Route path="/" element={<Landingpg />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/document/:id" element={<DocumentDetails />} />
          <Route path="/document/new" element={<DocumentForm />} />
        </Routes>
      </Router>
    </>
  );
};

export default App

