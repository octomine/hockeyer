import { Directions, ISwipeListeners } from "./Swipe.types"

class Swipe {
  private scene: Phaser.Scene
  private listeners!: ISwipeListeners
  private downPoint = new Phaser.Math.Vector2()
  private downTime = 0
  private direction = Directions.None

  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.setupEvents()
  }

  addListeners(listeners:ISwipeListeners) {
    this.listeners = listeners
  }

  private setupEvents() {
    this.scene.input.addListener(Phaser.Input.Events.POINTER_DOWN, this.downHandler, this)
    this.scene.input.addListener(Phaser.Input.Events.POINTER_UP, this.upHandler, this)
    this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scene.input.removeListener(Phaser.Input.Events.POINTER_DOWN, this.downHandler, this)
      this.scene.input.removeListener(Phaser.Input.Events.POINTER_MOVE, this.moveHandler, this)
      this.scene.input.removeListener(Phaser.Input.Events.POINTER_UP, this.upHandler, this)
    })
  }

  private downHandler(pointer: Phaser.Input.Pointer) {
    this.downPoint = pointer.position.clone()
    this.downTime = new Date().getTime()
    this.scene.input.addListener(Phaser.Input.Events.POINTER_MOVE, this.moveHandler, this)
  }

  private moveHandler(pointer: Phaser.Input.Pointer) {
    const distance = this.downPoint.distance(pointer.position)
    if (distance === 0) {
      this.direction = Directions.None
    } else {
      const rad = Phaser.Math.Angle.BetweenPoints(pointer.position, this.downPoint)
      const deg = Phaser.Math.RadToDeg(rad)
      const abs = Math.abs(deg)
      if (abs < 45) {
        this.direction = Directions.Left
      } else if (abs > 135) {
        this.direction = Directions.Right
      } else if (deg > 0) {
        this.direction = Directions.Up
      } else {
        this.direction = Directions.Down
      }
    }
    const time = new Date().getTime() - this.downTime
    if (this.listeners?.onMove) {
      this.listeners.onMove(this.direction, distance, time)
    }
  }

  private upHandler() {
    this.scene.input.removeListener(Phaser.Input.Events.POINTER_MOVE, this.moveHandler, this)
    if (this.listeners?.onUp) {
      this.listeners.onUp()
    }
  }
}

export default Swipe
