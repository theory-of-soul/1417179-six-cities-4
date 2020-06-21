import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";

const appSettings = {
  placesAmount: 312,
  placeList: [`Beautiful & luxurious apartment at great location`, `Wood and stone place`]
};

ReactDOM.render(
    <App
      placesAmount={appSettings.placesAmount}
      placeList={appSettings.placeList}
    />,
    document.getElementById(`root`)
);
