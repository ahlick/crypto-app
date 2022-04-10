import './App.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import TableCrypto from "./components/TableCrypto";
import Home from "./components/Home";
import AddTransaction from "./components/AddTransaction";
import {Routes, Route} from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='tablecrypto' element={<TableCrypto></TableCrypto>}></Route>
        <Route path='addtransaction' element={<AddTransaction></AddTransaction>}></Route>
      </Routes>
      </div>
  )
}

export default App

