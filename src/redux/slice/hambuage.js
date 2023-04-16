import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  /**
   * @type {boolean}                isOpen          是否打開漢堡選單
   * @type {boolean}                isTransform     轉場效果開關
   * @type {undefined|boolean}      isMobile        是不是手機設備
   */

  isOpen: false,
  isTransform: false,
  isMobile: undefined,
};

// ---------------------------------------------------------------------------------------------

export const hambuageSlice = createSlice({
  name: 'hambuage',
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },

    setIsTransform: (state, action) => {
      state.isTransform = action.payload;
    },

    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },

    resetHambuage: () => initialState,
  },
});

export const { setIsOpen, setIsTransform, setIsMobile, resetHambuage } =
  hambuageSlice.actions;

export default hambuageSlice.reducer;
