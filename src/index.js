import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";

const appSettings = {
  placesAmount: 312
};

ReactDOM.render(<App placesAmount={appSettings.placesAmount} />, document.getElementById(`root`));
