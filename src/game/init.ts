import 'phaser';
import { PlayGame } from '@game/scenes';

export const initGame = (): Phaser.Game => {
  const config = {
    type: Phaser.CANVAS,
    parent: 'game',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#eeeeee',
    scale: {
      mode: Phaser.Scale.RESIZE,
      parent: 'game',
      width: '100%',
      height: '100%',
    },
    scene: [PlayGame],
    physics: {
      default: 'arcade',
    },
  };
  return new Phaser.Game(config);
};
