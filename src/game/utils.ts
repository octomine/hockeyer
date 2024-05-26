export const getCenter = ({ width, height }: Phaser.Scale.ScaleManager) => ({
  x: width / 2,
  y: height / 2,
})

export const createLine = (q: number, sx = 30, sy = 30): { x: number, y: number }[] => {
  const res: { x: number, y: number }[] = []
  for (let i = 0; i < q; i++) {
    const x = i * sx
    const y = i * sy
    res.push({ x, y })
  }

  return res
}
