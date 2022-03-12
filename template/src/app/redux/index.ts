import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootSagas from './rootSagas'
import rootContext from './rootContext'
import rootReducer from './rootReducer'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const initializeStore = () => {
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
  const sagaMiddleware = createSagaMiddleware({
    context: {...rootContext},
  });
  
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(sagaMiddleware),
  });
  
  let persistor = persistStore(store)

  sagaMiddleware.run(rootSagas);

  return {
    store,
    persistor,
  }
}

export default initializeStore

type Store = ReturnType<typeof initializeStore>

export type RootState = ReturnType<Store['store']['getState']>;
