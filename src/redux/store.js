import { configureStore } from '@reduxjs/toolkit';

import exampleReducer from 'src/redux/slice/example';
import hambuageReducer from 'src/redux/slice/hambuage';

export const store = configureStore({
  reducer: {
    // example
    example: exampleReducer,

    // hambuage
    hambuage: hambuageReducer,
  },
});
