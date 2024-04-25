import { Player, Swipe } from "@game/index"

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
      onMove: this.player.modifyMotion.bind(this.player),
      onUp: this.player.resetMotion.bind(this.player)
    })
  }

  update() {
    if (this.player.y > this.scale.height) {
      this.player.setPosition(this.player.x, 50)
    }

    if (this.swipe.isMoving) {
      this.swipe.checkPointer()
    }
  }
}

export default MainScene
