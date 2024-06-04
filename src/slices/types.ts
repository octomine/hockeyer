interface IGame {
  isPlaying: boolean;
}

export interface ILevel {
  level: number;
  time: number;
}

export enum UIMessage {
  None = 0,
  LevelFinish,
  LevelUp,
}

interface IUI {
  message: UIMessage;
}

export interface IState {
  game: IGame;
  level: ILevel;
  UI: IUI;
}
