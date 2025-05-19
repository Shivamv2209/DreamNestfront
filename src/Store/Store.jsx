import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import states from "./reducers/states";

// Create a new name to avoid conflict
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// ❌ Don't do this
// const persistReducer = persistReducer(persistConfig, states);

// ✅ Do this instead
const persistedReducer = persistReducer(persistConfig, states);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
