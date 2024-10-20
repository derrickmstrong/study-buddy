import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import questionsReducer from "./questionsReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, questionsReducer);

const store = configureStore({
  reducer: {
    questions: persistedReducer,
  },
});

export const persistor = persistStore(store);
export default store;
