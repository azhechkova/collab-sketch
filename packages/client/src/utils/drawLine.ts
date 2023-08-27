import { EDITOR_DEFAULT_SETTINGS } from '@/constants'
import type { DrawReq } from '@/types'

/**
 * Draws a line on the canvas context using the specified parameters.
 *
 * @param {Partial<DrawReq>} params - The parameters for drawing the line.
 * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context to draw on.
 * @returns {void}
 */

const drawLine = (params: Partial<DrawReq>, ctx: CanvasRenderingContext2D): void => {
  const { prev, point, color, size } = params
  ctx.lineWidth = size || EDITOR_DEFAULT_SETTINGS.size
  ctx.strokeStyle = color || EDITOR_DEFAULT_SETTINGS.color
  ctx.lineCap = 'round'

  if (!point) return

  if (prev) {
    ctx.beginPath()
    ctx.moveTo(prev.x, prev.y)
    ctx.lineTo(point.x, point.y)
    ctx.stroke()
  } else {
    ctx.lineTo(point.x, point.y)
    ctx.stroke()
  }
}

export default drawLine
