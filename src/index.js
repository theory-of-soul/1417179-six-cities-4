import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import placeList from "./mocks/offers";
import {reducer} from "./reducer";
import {Provider} from "react-redux";
import {createStore} from "redux";

const appSettings = {
  placesAmount: 312,
  placeList
};

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
      <App
        placesAmount={appSettings.placesAmount}
        placeList={appSettings.placeList}
      />
    </Provider>,
    document.getElementById(`root`)
);
