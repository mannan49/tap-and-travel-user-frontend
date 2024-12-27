import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import userSliceReducer from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSliceReducer,
  },
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
