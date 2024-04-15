import { combineReducers } from "@reduxjs/toolkit";
import { fireStoreApi } from "./services/apiSlice";
import featuresReducer from "./features/appSlice";

export const rootReducer = combineReducers({
    features: featuresReducer,
    [fireStoreApi.reducerPath]: fireStoreApi.reducer
});
