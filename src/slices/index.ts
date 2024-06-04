import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import levelReducer from './levelSlice';
import uiReducer from './uiSlice';

export * from './gameSlice';
export * from './levelSlice';
export * from './uiSlice';

export default configureStore({
  reducer: {
    game: gameReducer,
    level: levelReducer,
    UI: uiReducer,
  },
});
