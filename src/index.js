import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import placeList from "./mocks/offers";

const appSettings = {
  placesAmount: 312,
  placeList
};

ReactDOM.render(
    <App
      placesAmount={appSettings.placesAmount}
      placeList={appSettings.placeList}
    />,
    document.getElementById(`root`)
);
