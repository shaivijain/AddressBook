import { createStore } from "redux";
import rootReducer from "./Reducers";
export const store = createStore( rootReducer);