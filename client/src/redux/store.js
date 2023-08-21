import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { createFilter } from "redux-persist-transform-filter";
import storage from "redux-persist/lib/storage";
// Slices
import userSlice from "./userSlice";
import chatSlice from "./chatSlice";

// Persist Config
const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
  transforms: [createFilter("user", ["user"])], // only save user object
};

export const rootReducer = combineReducers({
  user: userSlice,
  chat: chatSlice,
});
export const persistedReducer = persistReducer(persistConfig, rootReducer);

function configureAppStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    devTools: true,
  });
}

export const store = configureAppStore();
export const persistor = persistStore(store);
