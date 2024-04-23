import { Directions, Swipe, getCenter } from "@game/index"

const DRAG = 30

class MainScene extends Phaser.Scene {
  private gObj!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody

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
    this.gObj.setDrag(DRAG)

    this.swipe = new Swipe(this, {
      onMove: (direction: Directions, distance: number, time: number) => {
        const velocity = this.gObj.body.velocity.length()
        switch (direction) {
          case Directions.Down:
            this.gObj.setAccelerationY(1000 * distance / time)
            break
          case Directions.Left:
          case Directions.Right:
            if (velocity > 0) {
              this.gObj.setVelocityX(50 * (Directions.Down - direction))
            }
            break
          case Directions.Up:
            if (velocity > 0) {
              this.gObj.setDrag(time);
            }
            break
          default:
        }
      },
      onUp: () => {
        this.gObj.setAccelerationY(0)
        this.gObj.setDrag(DRAG)
      }
    })
    console.log(this.swipe);
  }

  update() {
    if (this.gObj.y > this.scale.height) {
      this.gObj.setPosition(this.gObj.x, 50)
    }
  }
}

export default MainScene
