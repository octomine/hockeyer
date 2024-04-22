import { getCenter } from "@game"

class MainScene extends Phaser.Scene {
  private gObj!: Phaser.GameObjects.GameObject

  constructor() {
    super('main')
  }

  preload() {
    this.load.image('char', 'assets/char.png')
  }

  create() {
    const { x, y } = getCenter(this.scale)
    this.gObj = this.add.image(x, y, 'char')
  }
}

export default MainScene
