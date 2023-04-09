import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  /**
   * @type {undefined|number}   value   值
   */

  value: undefined,
};

// ---------------------------------------------------------------------------------------------

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setExample: (state, action) => {
      state.value = action.payload;
    },

    resetExample: () => initialState,
  },
});

export const { setExample, resetExample } = exampleSlice.actions;

export default exampleSlice.reducer;
