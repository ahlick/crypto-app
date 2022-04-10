import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTransactionAsync } from "../components/features/transaction/transactionSlice";
import Navibar from "./Navibar";
import Popup from "./Popup";
import LoadingIcon from "./LoadingIcon";
import { useForm } from "react-hook-form";

function AddTransaction() {
  const [addFormData, setAddFormData] = useState({
    tokenCode: "",
    numberOfToken: "",
    purchasePrice: "",
  });

  const [buttonPopup, setButtonPopup] = useState(false);

  const [isLoading, setIsLoading] = useState(false)

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  const dispatch = useDispatch();

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    console.log(fieldName);
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newCrypto = {
      id: Math.floor(Math.random() * 10),
      tokenCode: addFormData.tokenCode,
      numberOfToken: addFormData.numberOfToken,
      purchasePrice: addFormData.purchasePrice,
    };

    if (newCrypto) {
      dispatch(
        addTransactionAsync({
          tokenCode: newCrypto.tokenCode,
          numberOfToken: newCrypto.numberOfToken,
          purchasePrice: newCrypto.purchasePrice,
        })
      );
    }

    setIsLoading(false);

    setAddFormData({
      tokenCode: "",
      numberOfToken: "",
      purchasePrice: "",
    });
  };

  return (
    <div>
      <Navibar></Navibar>
      <h1 className="transactionHeading">Add New Transaction</h1>
      <Form onSubmit={handleAddFormSubmit}>
        <Row className="fieldRow">
          <Col>
            <Form.Group className="tokenCodeField">
              <Form.Control
                name="tokenCode"
                value={addFormData.tokenCode}
                placeholder="Token Code"
                onChange={handleAddFormChange}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="numberOfTokenField">
              <Form.Control
                name="numberOfToken"
                value={addFormData.numberOfToken}
                placeholder="Number of Token"
                onChange={handleAddFormChange}
                // {...register("numberOfToken", {
                //   required: true,
                //   minLength: {
                //     value: 6,
                //     message: "Number of token should be at least 6",
                //   }
                // })}
              />
              {/* {errors.numberOfToken && (
            <p className="errorMsg">{errors.numberOfToken.message}</p>
          )} */}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="purchasePriceField">
              <Form.Control
                name="purchasePrice"
                value={addFormData.purchasePrice}
                placeholder="Purchase Price"
                onChange={handleAddFormChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button
          type="submit"
          variant="primary"
          onClick={() => setButtonPopup(true)}
        >
          Add a transaction
        </Button>{" "}
      </Form>
      {isLoading ? (
        <LoadingIcon></LoadingIcon>
      ) : ''}

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h3>Successful</h3>
      </Popup>
    </div>
  );
}

export default AddTransaction;
