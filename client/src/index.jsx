import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
// import Home from './components/Home';
import Register from './components/RegisterKyc';
import Update from './components/Update';
import Status from './components/Status';
import { EthProvider } from "./contexts/EthContext";
import AddBank from './components/Admin';
import Bank from './components/Bank';
import Loan from './components/Loan';
import GetLoanInfo from './components/GetLoanInfo';
import Nav from './Nav';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <EthProvider>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="register" element={<Register />} />
        <Route path="update/:id" element={<Update />} />
        <Route path="status" element={<Status />} />
        <Route path="admin" element={<AddBank />} />
        <Route path="bank" element={<Bank />} />
        <Route path="addloan" element={<Loan />} />
        <Route path="getloaninfo/:id" element={< GetLoanInfo />} />
      </Routes>
    </BrowserRouter>
  </EthProvider>
);
