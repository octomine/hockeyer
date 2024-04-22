import 'phaser'
import { MainScene } from '@game/scenes'

declare global {
  interface Window {
    game: Phaser.Game
  }
}

export const initGame = () => {
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
    scene: [MainScene],
    physics: {
      default: 'arcade'
    }
  }
  window.game = new Phaser.Game(config)
}
