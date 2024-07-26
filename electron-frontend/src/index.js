import React from 'react';
import ReactDOM from 'react-dom/client';

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Main_Page} from "./main_page/main"
import {About_Page} from "./about_page/main"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
          <Route path="/" element={<Main_Page />} />
          <Route path="/about" element={<About_Page />} />
          <Route path="/app" element={<App />} />
        </Routes>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
