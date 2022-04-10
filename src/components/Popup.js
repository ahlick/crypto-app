import React from 'react'
import {Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./myStyles.css";

function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <Button className="close-btn" onClick={() => props.setTrigger(false)}>
                    Close
                </Button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup
