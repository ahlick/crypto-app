import React from "react";
import Navibar from "../Navibar";
import { useNavigate } from "react-router-dom";
import { Button, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="background">
      <Navibar></Navibar>
      <Carousel className="carousel">
        <Carousel.Item>
          <img
            className="slides"
            src={require("./images/slide1.jpg")}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome to your Crypto Wallet</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="slides"
            src={require("./images/slide2.jpg")}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Add transactions to keep track of your crypto records</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="slides"
            src={require("./images/slide3.jpg")}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Enjoy your experience</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Button
        className="homeButton"
        onClick={() => navigate("/addtransaction")}
        variant="info"
      >
        <h1>Add Transaction</h1>
      </Button>{" "}
    </div>
  );
}

export default Home;
