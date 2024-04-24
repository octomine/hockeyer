import { Directions, Player, Swipe } from "@game/index"

const DRAG = 30

class MainScene extends Phaser.Scene {
  private player!: Player

  private swipe!: Swipe

  constructor() {
    super('main')
  }

  preload() {
    this.load.image('char', 'assets/char.png')
  }

  create() {
    this.player = new Player(this)

    this.swipe = new Swipe(this)
    this.swipe.addListeners({
      onMove: (direction: Directions, distance: number, time: number) => {
        const velocity = this.player.body?.velocity.length() || 0
        switch (direction) {
          case Directions.Down:
            this.player.setAccelerationY(1000 * distance / time)
            break
          case Directions.Left:
          case Directions.Right:
            if (velocity > 0) {
              this.player.setVelocityX(50 * (Directions.Down - direction))
            }
            break
          case Directions.Up:
            if (velocity > 0) {
              this.player.setDrag(time);
            }
            break
          default:
        }
      },
      onUp: () => {
        this.player.setAccelerationY(0)
        this.player.setDrag(DRAG)
      }
    })
  }

  update() {
    if (this.player.y > this.scale.height) {
      this.player.setPosition(this.player.x, 50)
    }
  }
}

export default MainScene
