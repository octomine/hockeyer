import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  level: 1,
  time: '0.00',
  iTime: 0,
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
    increaseTime: (state) => {
      const { iTime } = state;
      let timeN = (new Date().getTime() - iTime) / 10;
      timeN = Math.floor(timeN) / 100;
      let time = timeN.toString();
      time = time.includes('.') ? time : `${time}.00`;

      return { ...state, time };
    },
    resetTime: (state) => ({
      ...state,
      time: '0.00',
      iTime: new Date().getTime(),
    }),
  },
});

export const { levelUp, setLevel, increaseTime, resetTime } =
  levelSlice.actions;

export default levelSlice.reducer;
