import {combineReducers} from "redux";
import {app} from "./reducers/app/app";
import {data} from "./reducers/data/data";
import {user} from "./reducers/user/user";

export const rootReducer = combineReducers({
  data,
  app,
  user
});
