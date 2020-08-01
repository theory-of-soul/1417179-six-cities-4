import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import {rootReducer as reducer} from "./reducer";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {createAPI} from "./api";
import {actionCreator, AuthorizationStatus, userOperations} from "./reducers/user/user";
import history from "./history";
import {AppUrls} from "./app-urls";

const onUnauthorized = () => {
  store.dispatch(actionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
  history.push(AppUrls.AUTH);
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(userOperations.checkAuthStatus());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById(`root`)
);
