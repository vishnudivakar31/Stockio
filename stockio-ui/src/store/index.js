import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import rootReducer from "../reducers/index"
import mySaga from "../redux_saga/saga"

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}

const sagaMiddleware = createSagaMiddleware()
const pReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    pReducer,
    applyMiddleware(sagaMiddleware)
)
export const persistor = persistStore(store)

sagaMiddleware.run(mySaga)
