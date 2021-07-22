import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

//reducers
import flights from "./reducers/flights";

const INITIAL_STATE = {};

const middleware = [thunk];

const rootReducer = combineReducers({
    tickets: flights
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
    rootReducer,
    INITIAL_STATE,
    applyMiddleware(...middleware),
);

export default store;