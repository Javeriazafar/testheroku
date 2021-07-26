import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import itemReducer from './item/item.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['item']
};

const rootReducer = combineReducers({
  
  item: itemReducer
  
});

export default persistReducer(persistConfig, rootReducer);