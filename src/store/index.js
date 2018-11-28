import appReducer from "./reducers";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

export default (initialState = {}) => {
  return composeWithDevTools(applyMiddleware(thunk))(
    createStore
  )(appReducer, initialState);
};
