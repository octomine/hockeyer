import { createLevel } from "@app/game/level/create"
import { Player, Swipe, Bonus } from "@game/index"

const WORLD_PADDINGS = 50
const OFFSET_COEFF = .75
const PADDING_V = 30
const PADDING_H = 50

class MainScene extends Phaser.Scene {
  private player!: Player

  private barGrp!: Phaser.Physics.Arcade.Group
  private bonusGrp!: Phaser.Physics.Arcade.Group

  private swipe!: Swipe

  constructor() {
    super('main')
  }

  preload() {
    this.load.image('ice', 'assets/ice.png')
    this.load.image('char', 'assets/char.png')
    this.load.image('bar', 'assets/barrier.png')
    this.load.image('bonus', 'assets/bonus.png')
  }

  create() {
    this.player = new Player(this)

    this.barGrp = this.physics.add.group()
    this.physics.add.collider(this.player, this.barGrp)

    this.bonusGrp = this.physics.add.group()
    this.physics.add.overlap(this.player, this.bonusGrp, (_, obj) => {
      const bonus = obj as Bonus
      this.bonusGrp.remove(bonus)
      bonus.collect()
    })

    const { width, height } = createLevel(this, this.player, this.barGrp, this.bonusGrp)

    this.cameras.main.setBounds(-WORLD_PADDINGS, -WORLD_PADDINGS, width + 2 * WORLD_PADDINGS, height + 2 * WORLD_PADDINGS)
    this.cameras.main.startFollow(this.player, true, .05, .05)

    this.swipe = new Swipe(this)
    this.swipe.addListeners({
      onMove: this.player.modifyMotion.bind(this.player),
      onUp: this.player.checkAcceleration.bind(this.player)
    })
  }

  update() {
    if (this.player.body) {
      const { x, y } = this.player.body.velocity
      const xOffset = Math.min(OFFSET_COEFF * x, (this.scale.height / 2) - PADDING_V)
      const yOffset = Math.min(OFFSET_COEFF * y, (this.scale.height / 2) - PADDING_H)
      this.cameras.main.setFollowOffset(-xOffset, -yOffset)
    }
  }
}

export default MainScene
