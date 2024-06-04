import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPlaying: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setIsPlaying: (state, { payload }) => {
      state.isPlaying = payload;
    },
  },
});

export const { setIsPlaying } = gameSlice.actions;

export default gameSlice.reducer;
