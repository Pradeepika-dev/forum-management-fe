import React from "react";
import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import axios from "axios";
import AddPost from "./components/post/AddPost";
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

//To check Bearer token is there or not.
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : ``;
    return config;
})

function App() {

    const token = localStorage.getItem("auth_token");
  return (
    <div className="App">

      <Router>

        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/create" element={<AddPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
