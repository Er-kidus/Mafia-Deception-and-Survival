// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userReducer from "../features/Auth/slice.js";
import UIReducer from "./uiSlice.js";

// 🔐 Configuration for redux-persist
const persistConfig = {
  key: "user", // key to store in localStorage
  storage, // use localStorage
};

// 🎯 Wrap your userReducer with persistReducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// 🏪 Create the store
const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    UIState: UIReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disable serializable check for redux-persist
    }),
});

// 🚀 Create a persistor to control persistence
export const persistor = persistStore(store);
export default store;
