import { Directions, Swipe, getCenter } from "@game/index"

class MainScene extends Phaser.Scene {
  private gObj!: Phaser.GameObjects.GameObject

  private swipe!: Swipe

  constructor() {
    super('main')
  }

  preload() {
    this.load.image('char', 'assets/char.png')
  }

  create() {
    const { x, y } = getCenter(this.scale)
    this.gObj = this.add.image(x, y, 'char')
    console.log(this.gObj);

    this.swipe = new Swipe(this, { callback: (dir: Directions) => { console.log(dir); } })
  }
}

export default MainScene
