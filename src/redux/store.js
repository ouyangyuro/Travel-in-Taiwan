import { configureStore } from '@reduxjs/toolkit';

import exampleReducer from 'src/redux/slice/example';

export const store = configureStore({
  reducer: {
     // example
    example: exampleReducer,
  },
});
