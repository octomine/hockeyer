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
      onUp: this.player.checkAcceleration.bind(this.player)
    })
  }

  update() {
    if (this.player.y > this.scale.height - 1.5 * this.player.height) {
      this.player.setPosition(this.player.x, 50)
    }
  }
}

export default MainScene
