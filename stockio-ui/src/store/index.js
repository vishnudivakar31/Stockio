import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import userReducer from "../reducers/UserReducer"
import stockReducer from "../reducers/StockReducer"
import newsReducer from "../reducers/NewsReducer"
import mySaga from "../redux_saga/saga"

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['stockReducer', 'newsReducer'],
    stateReconciler: autoMergeLevel2
}

const sagaMiddleware = createSagaMiddleware()
const reducer = {
    userReducer,
    stockReducer,
    newsReducer
}
const pReducer = persistCombineReducers(persistConfig, reducer)

export const store = createStore(
    pReducer,
    applyMiddleware(sagaMiddleware)
)
export const persistor = persistStore(store)

sagaMiddleware.run(mySaga)
