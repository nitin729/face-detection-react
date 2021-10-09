import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import logo from "./logo.png";

const Logo = () => {
  return (
    <div className="mt4 mb4 pa0 center">
      <Tilt
        className="Tilt br3 shadow-2"
        options={{ max: 55 }}
        style={{ height: 100, width: 100 }}
      >
        <div className="Tilt-inner pa3">
          <img style={{ paddingTop: "1px" }} alt="logo" src={logo}></img>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
