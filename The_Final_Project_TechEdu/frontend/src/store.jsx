import { applyMiddleware, createStore } from 'redux';
import {thunk} from 'redux-thunk'; 
import {composeWithDevTools} from "redux-devtools-extension"
import rootreducers from "./components/redux/reducers/mainReducer";

// const middleware=[thunk];

// const store = createStore (
//     rootreducers,
//     // composeWithDevTools(applyMiddleware(...middleware))
// )

const store = createStore(
    rootreducers,
    applyMiddleware(thunk) // Add thunk middleware here
  );

export default store;