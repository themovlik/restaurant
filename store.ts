import {combineReducers, configureStore} from '@reduxjs/toolkit';
import restaurantsListSlice from './restaurantListSlice';

const rootReducer = combineReducers({
  restaurantsList: restaurantsListSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
