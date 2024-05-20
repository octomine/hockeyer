import Barrier from "@app/game/entities/barrier/Barrier"
import { Player, Swipe } from "@game/index"

class MainScene extends Phaser.Scene {
  private player!: Player
  private barGrp!: Phaser.Physics.Arcade.Group

  private swipe!: Swipe

  constructor() {
    super('main')
  }

  preload() {
    this.load.image('ice', 'assets/ice.png')
    this.load.image('char', 'assets/char.png')
    this.load.image('bar', 'assets/barrier.png')
  }

  create() {
    const { width, height } = this.add.image(0, 0, 'ice').setOrigin(0)
    const textureCopies = 5
    const h = height * textureCopies
    for (let i = 0; i < textureCopies; i++) {
      this.add.image(0, i * height, 'ice').setOrigin(0)
    }

    this.cameras.main.setBounds(0, 0, width, h)
    this.physics.world.setBounds(0, 0, width, h)

    this.player = new Player(this)
    this.player.setPosition(width / 2, 50)
    this.barGrp = this.physics.add.group()
    this.physics.add.collider(this.player, this.barGrp)

    this.cameras.main.startFollow(this.player, true, .05, .05)

    this.swipe = new Swipe(this)
    this.swipe.addListeners({
      onMove: this.player.modifyMotion.bind(this.player),
      onUp: this.player.checkAcceleration.bind(this.player)
    })

    this.updateBars()
  }

  update() {
    // const { y } = this.player
    // if (y > this.scale.height - 1.5 * this.player.height) {
    //   this.player.setPosition(this.player.x, 50)
    //   this.updateBars()
    // }
  }

  updateBars() {
    this.barGrp.clear(true, true)
    const { width, height } = this.scale;
    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(0, width)
      const y = Phaser.Math.Between(0, height)
      const bar = this.physics.add.existing(new Barrier(this, x, y))
      this.barGrp.add(bar)
    }
  }
}

export default MainScene
