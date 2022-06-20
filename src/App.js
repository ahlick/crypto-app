import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TableCrypto from "./components/tableCrypto/TableCrypto";
import AddTransaction from "./components/addTransaction/AddTransaction";
import { Routes , Route} from "react-router-dom";

// C:\NotBackedUp\react-project\my-app
// json-server --watch db.json

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<TableCrypto/>}></Route>
        <Route path='addtransaction' element={<AddTransaction/>}></Route>

      </Routes>

    </div>
  );
}

export default App;

