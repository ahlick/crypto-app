import React, { useState, useEffect } from "react";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./myStyles.css";
import { useDispatch, useSelector } from "react-redux";
import Navibar from "./Navibar";
import { getTransactionsAsync } from "../components/features/transaction/transactionSlice";
import { deleteTransactionAsync } from "../components/features/transaction/transactionSlice";
import { updatePriceAsync } from "../components/features/transaction/transactionSlice";
import { getCurrentPriceAsync } from "../components/features/prices/priceSlice";
import { useNavigate } from "react-router-dom";

const TableCrypto = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);
  const prices = useSelector((state) => state.prices);
  const [searchItems, setSearchItems] = useState("");

  // console.log(cryptoTransactions);
  // console.log(cryptoprice);

  // console.log(transactions[1].currentPrice);
  // console.log(prices);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTransactionsAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCurrentPriceAsync());
  }, [dispatch]);

  useEffect(() => {
    for(var i=0; i < prices.length; i++){
      // console.log(prices[i].symbol)
      for (var j=0; j< transactions.length; j++) {
        if(prices[i].symbol === transactions[j].tokenCode){
          // console.log(tokenId);
          // console.log(transaction;s[j].currentPrice)
          // console.log(prices[i]);
          // console.log(prices[i].current_price);
          dispatch(updatePriceAsync({id: transactions[j].id, currentPrice: prices[i].current_price}));
          // transactions = transactions.splice([j][4], 1, prices[i].current_price);
          
        }
      }
    }
  }, [prices]);

  const handleDeleteClick = (id) => {
    dispatch(deleteTransactionAsync({ id }));
  };

  return (
    <div>
      <Navibar></Navibar>
      <InputGroup className="searchBar">
        <FormControl 
          className= "searchField"
          placeholder="Search Token Code"
          aria-label="Token Code"
          aria-describedby="basic-addon1"
          onChange={(e) => {
            setSearchItems(e.target.value);
          }}
        />
      </InputGroup>

      <Table className="container" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th className="heading">Token Code</th>
            <th className="heading">Number of Token</th>
            <th className="heading">Purchase Price</th>
            <th className="heading">Current Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions
            .filter((val) => {
              if (searchItems === "") {
                return true;
              } else {
                return val.tokenCode.toLowerCase().includes(searchItems.toLowerCase());
              }
            })
            .map((data) => (
              <tr key={data.id}>
                <td>{data.tokenCode}</td>
                <td>{data.numberOfToken} </td>
                <td>${data.purchasePrice}</td>
                <td>${data.currentPrice}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(data.id)}
                  >
                    X
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Button
        className="addTransButton"
        onClick={() => navigate("/addtransaction")}
        variant="primary"
      >
        <h4>Add more transaction</h4>
      </Button>
      {/* <Table className="container" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th className="heading">Token Code</th>
            <th className="heading">Current Price</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((data) => (
            <tr key={data.id}>
              <td>{data.symbol}</td>
              <td>${data.current_price} </td>
            </tr>
          ))}
        </tbody>
      </Table> */}
    </div>
  );
};

export default TableCrypto;
