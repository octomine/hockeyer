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
    const { x } = getCenter(this.scale)
    this.gObj = this.physics.add.image(x, 50, 'char')
    this.gObj.setDrag(30)

    this.swipe = new Swipe(this, {
      onMove: (direction: Directions, distance: number, time: number) => {
        switch (direction) {
          case Directions.Down:
            this.gObj.setAccelerationY(1000 * distance / time)
            break
          case Directions.Left:
          case Directions.Right:
            this.gObj.setVelocityX(100 * (Directions.Down - direction))
            break
          default:
        }
      },
      onUp: (direction: Directions) => {
        console.log(direction);
        this.gObj.setAccelerationY(0)
      }
    })
  }
}

export default MainScene
