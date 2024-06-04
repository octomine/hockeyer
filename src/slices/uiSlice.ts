import { createSlice } from '@reduxjs/toolkit';
import { UIMessage } from './types';

const initialState = {
  message: UIMessage.None,
};

const uiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    showMessage: (state, { payload }) => ({ ...state, message: payload }),
  },
});

export const { showMessage } = uiSlice.actions;

export default uiSlice.reducer;
