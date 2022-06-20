import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function SuccessfulBanner() {
  
  const initialState = true
  const [show, setShow] = useState(initialState);

  useEffect(() => {
    if (show){
      setTimeout(() => setShow(false), 2000);
    }
  }, [])

  return (
    <div>
      <Alert show={show} variant="success">
        <Alert.Heading>Transaction added successful!</Alert.Heading>
        <hr />
      </Alert>

    </div>
  );
}

export default SuccessfulBanner;
