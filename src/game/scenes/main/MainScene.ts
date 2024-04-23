import { Directions, Swipe, getCenter } from "@game/index"

const DRAG = 30

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

    const body = this.gObj.body as Phaser.Physics.Arcade.Body
    body.setDrag(DRAG)

    this.swipe = new Swipe(this, {
      onMove: (direction: Directions, distance: number, time: number) => {
        switch (direction) {
          case Directions.Down:
            body.setAccelerationY(1000 * distance / time)
            break
          case Directions.Left:
          case Directions.Right:
            body.setVelocityX(50 * (Directions.Down - direction))
            break
          case Directions.Up:
            if(body.velocity.length()>0) {
              body.setDrag(time);
            }
            break
          default:
        }
      },
      onUp: () => {
        body.setAccelerationY(0)
        body.setDrag(DRAG)
      }
    })
    console.log(this.swipe);
  }
}

export default MainScene
