import {combineReducers} from "redux";
import {app} from "./reducers/app/app";
import {data} from "./reducers/data/data";
import {user} from "./reducers/user/user";
import {reviews} from "./reducers/reviews/reviews";

export const rootReducer = combineReducers({
  data,
  app,
  user,
  reviews
});
