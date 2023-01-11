import React from "react";
import "./Success.css";
import { TypeMessageIsSent } from "../types/Types";

// Provide feedback upon successful form submission
const Success: React.FC<TypeMessageIsSent> = ({ sent, setSent }) => {
  return (
    <div className={sent ? "popup center popup__active" : "popup center"}>
      <div className="popup__icon">
        <i className="uil uil-check uil-icon"></i>
      </div>
      <div className="popup__title">Form is submitted !</div>
      <div className="popup__description">
        <p className="popup__text">
          We will get back to you as soon as possible.
        </p>
      </div>
      <div className="dissmiss__btn">
        <button onClick={() => setSent(false)}>Dismiss</button>
      </div>
    </div>
  );
};

export default Success;
