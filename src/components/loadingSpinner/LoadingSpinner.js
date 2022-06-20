import Spinner from "react-bootstrap/Spinner";

import React from "react";

function loadingSpinner() {
  return (
    <div>
      <Spinner animation="border" variant="danger" />
    </div>
  );
}

export default loadingSpinner;
