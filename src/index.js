import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import PGDetailsPage from "./pages/PGDetails/PGDetailsPage";
import AddListing from "./pages/AddListing";
import Navbar from "./Navbar";
import "mapbox-gl/dist/mapbox-gl.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <BrowserRouter>
     <Navbar />
    <Routes>
  
      <Route path="/" element={<HomePage />} />
      <Route path="/pgs/:id" element={<PGDetailsPage />} />
      <Route path="/pgs/addListing" element={<AddListing />}/>
    </Routes>
    </BrowserRouter>
);

reportWebVitals();