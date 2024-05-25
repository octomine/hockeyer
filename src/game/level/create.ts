import { Player, Bonus, Barrier } from "../entities"

const TEXTURE_COPIES = 5

export const createLevel = (
  scene: Phaser.Scene,
  player: Player,
  barGrp: Phaser.Physics.Arcade.Group,
  bonusGrp: Phaser.Physics.Arcade.Group
): { width: number, height: number } => {
  const { width, height } = scene.add.image(0, 0, 'ice').setOrigin(0)
  const h = height * TEXTURE_COPIES
  for (let i = 0; i < TEXTURE_COPIES; i++) {
    scene.add.image(0, i * height, 'ice').setOrigin(0)
  }

  scene.physics.world.setBounds(0, 0, width, h)
  player.setPosition(width / 2, 50)
  player.setDepth(1)

  const x = width / 2
  const y = 200
  const step = 50
  for (let i = 0; i < 5; i++) {
    const bonus = new Bonus(scene, x, y + i * step)
    bonusGrp.add(bonus)
  }

  const n = 3
  const r = 50
  for (let i = 0; i < 3; i++) {
    const alpha = i * Math.PI / n
    const xx = x + r * Math.cos(alpha)
    const yy = 300 + r * Math.sin(alpha)
    const barrier = new Barrier(scene, xx, yy)
    barGrp.add(barrier)
  }

  return { width, height: h }
}
