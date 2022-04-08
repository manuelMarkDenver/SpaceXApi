import { configureStore } from '@reduxjs/toolkit';
import spacexReducer from './spacex/spacexSlice';

export const store = configureStore({
  reducer: {
    launches: spacexReducer,
  },
});
