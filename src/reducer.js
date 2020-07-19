import {combineReducers} from "redux";
import {app} from "./reducers/app/app";
import {data} from "./reducers/data/data";

export const rootReducer = combineReducers({
  data,
  app
});
