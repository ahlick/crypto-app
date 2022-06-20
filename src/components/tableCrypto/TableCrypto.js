import React, { useState, useEffect } from "react";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TableCrypto.css";
import { useDispatch, useSelector } from "react-redux";
import Navibar from "../navibar/Navibar";
import {
  getTransactionsAsync,
} from "../store/transaction/transactionSlice";
import { deleteTransactionAsync } from "../store/transaction/transactionSlice";
import { getCurrentPriceAsync } from "../store/prices/priceSlice";
import { selectLoading } from "../store/loading/loadingSlice";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../loading/LoadingIcon";

const TableCrypto = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);
  const prices = useSelector((state) => state.prices);
  const [searchItems, setSearchItems] = useState("");
  const isLoading = useSelector(selectLoading);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTransactionsAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCurrentPriceAsync());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    dispatch(deleteTransactionAsync({ id }));
  };

  if (isLoading.loading) {
    return (
      <div>
        <LoadingIcon></LoadingIcon>;
      </div>
    );
  } else {
    return (
      <div>
        <Navibar></Navibar>
        <InputGroup className="container">
          <FormControl
            className="searchField"
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
                  return val.tokenCode
                    .toLowerCase()
                    .includes(searchItems.toLowerCase());
                }
              })
              .map((data) => (
                <tr key={data.id}>
                  <td>{data.tokenCode}</td>
                  <td>{data.numberOfToken} </td>
                  <td>${data.purchasePrice}</td>
                  <td>${prices.priceMap.get(`${data.tokenCode}`)}</td>
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
          onClick={() => navigate("/addTransaction")}
          variant="primary"
        >
          <h4>Add more transaction</h4>
        </Button>
      </div>
    );
  }
};

export default TableCrypto;
