import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  level: 1,
  time: 0,
};

const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    levelUp: (state) => {
      const { level } = state;
      return { ...state, level: level + 1 };
    },
    setLevel: (state, { payload }) => ({ ...state, level: payload }),
    increaseTime: (state, { payload }) => {
      const { time } = state;
      return { ...state, time: time + payload };
    },
    resetTime: (state) => ({ ...state, time: 0 }),
  },
});

export const { levelUp, setLevel, increaseTime, resetTime } =
  levelSlice.actions;

export default levelSlice.reducer;
