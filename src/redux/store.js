import { combineReducers, createStore } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import orderReducers from "./reducers/orderReducers";
import productReducers from "./reducers/productReducers";
import categoryReducers from "./reducers/categoryReducer";

const combinedReducer = combineReducers({
    order: orderReducers,
    product: productReducers,
    category: categoryReducers,
})

const persistConfig = {
    key: 'root',
    storage,
    // blacklist: ['order'],
}

const persistedReducer = persistReducer(persistConfig, combinedReducer);
const store = createStore(persistedReducer)
const persistor = persistStore(store);
export { store, persistor }