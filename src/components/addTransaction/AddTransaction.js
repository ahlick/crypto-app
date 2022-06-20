import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransactionAsync } from "../store/transaction/transactionSlice";
import Navibar from "../navibar/Navibar";
import SuccessBanner from "../banner/SuccessfulBanner";
import LoadingIcon from "../loading/LoadingIcon";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import { selectLoading } from "../store/loading/loadingSlice";
import "./AddTransaction.css";
import { Nav, Form, Button, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AddTransaction() {
  
  const [form, setForm] = useState({
    tokenCode: "",
    numToken: "",
    tokenPrice: "",
  });
  
  const [errors, setErrors] = useState({});

  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // get our new errors
    const newErrors = findFormErrors();
    
    if (Object.keys(newErrors).length > 0) {
      // Have errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      dispatch(addTransactionAsync({
        tokenCode: form.tokenCode,
        numberOfToken: form.numToken, 
        purchasePrice: form.tokenPrice
      }))

      setDisableForm(true);

      setForm({
        tokenCode: "",
        numToken: "",
        tokenPrice: "",
      })
  
      setTimeout(() => setDisableForm(false), 3000);
      
    }
  };

  const findFormErrors = () => {
    const { tokenCode, numToken, tokenPrice } = form;
    const newErrors = {};
    const regex = /^(0|[1-9]\d*)(\.\d+)?$/;
    // token errors
    if (!tokenCode || tokenCode === ""){      
      newErrors.tokenCode = "cannot be blank!"}

    // number token errors
    if (!numToken || numToken === ""){
      newErrors.numToken = "cannot be blank"
    } 
    else if (numToken < 0) {
      newErrors.numToken = "must be more than 0"
    }
    else if (!regex.test(numToken)) {
      newErrors.numToken = "must be a number"
    }
    
    // token price errors
    if (!tokenPrice || tokenPrice === "")
      {newErrors.tokenPrice = "cannot be blank"}
    else if (tokenPrice < 0)
      {newErrors.tokenPrice = "must be more than 0"}
    else if (!regex.test(tokenPrice)) {
      newErrors.tokenPrice = "must be a number"
      }

    return newErrors;
  };

  const [disableForm, setDisableForm] = useState(false);

  const [pageLoad, setPageLoad] = useState(true);

  const isLoading = useSelector(selectLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => setPageLoad(false), 3000);
  }, []);

  return (
    <>
      {pageLoad === false ? (
        <div>
          <Navibar></Navibar>
          {isLoading.isSuccess ? <SuccessBanner></SuccessBanner> : ""}
          <div className="addBox">
            <div className="addForm">
              <h1 className="transactionHeading">Add New Transaction</h1>
              <fieldset disabled={disableForm}>
              <Form >
                <Form.Group className="fieldBox" controlId="formBasicPassword">
                  <Form.Label className="labelBox">Token Code</Form.Label>
                  <Form.Control
                    value={form.tokenCode}
                    className="inputBox"
                    type="text"
                    placeholder="Enter Token Code"
                    onChange={(e) => setField("tokenCode", e.target.value)}
                    isInvalid={!!errors.tokenCode}
                    onBlur={handleFocus}
                    focused={focused.toString()}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.tokenCode}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="fieldBox" controlId="formBasicPassword">
                  <Form.Label className="labelBox">Number of Token</Form.Label>
                  <Form.Control
                    value={form.numToken}
                    type="float"
                    className="inputBox"
                    placeholder="Number of Token"
                    onChange={(e) => setField("numToken", e.target.value)}
                    isInvalid={!!errors.numToken}
                    onBlur={handleFocus}
                    focused={focused.toString()}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.numToken}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="fieldBox" controlId="formBasicPassword">
                  <Form.Label className="labelBox">Purchase Price</Form.Label>
                  <Form.Control
                    value={form.tokenPrice}
                    type="float"
                    className="inputBox"
                    placeholder="Purchase Price"
                    onChange={(e) => setField("tokenPrice", e.target.value)}
                    isInvalid={!!errors.tokenPrice}
                    onBlur={handleFocus}
                    focused={focused.toString()}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.tokenPrice}
                  </Form.Control.Feedback>
                </Form.Group>

                <div>
                  <Button className="addButton" variant="primary" type="submit" onClick={ handleSubmit }>
                    Add a transaction
                  </Button>
                  <div className="spinner">
                    {isLoading.loading ? <LoadingSpinner></LoadingSpinner> : ""}
                  </div>
                </div>

                <div className="cancelButton">
                  <Button variant="link">
                    <Nav.Link href="/">Cancel</Nav.Link>
                  </Button>
                </div>
              </Form>
              </fieldset>

            </div>
          </div>
        </div>
      ) : (
        <LoadingIcon></LoadingIcon>
      )}
    </>
  );
}

export default AddTransaction;
