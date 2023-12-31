import type { Coordinates } from '@/types'

/**
 * Transforms client coordinates to canvas coordinates.
 *
 * @param {number} clientX - The X coordinate relative to the client viewport.
 * @param {number} clientY - The Y coordinate relative to the client viewport.
 * @param {HTMLCanvasElement | null} canvasRef - The reference to the HTML canvas element.
 * @returns {Coordinates} An object containing transformed coordinates: { x: number, y: number }.
 */

const transformCoordinates = (
  clientX: number,
  clientY: number,
  canvasRef: HTMLCanvasElement | null
): Coordinates => {
  if (!canvasRef)
    return {
      x: clientX,
      y: clientY
    }

  const rectangularPoints = canvasRef.getBoundingClientRect()
  return {
    x: clientX - rectangularPoints.left,
    y: clientY - rectangularPoints.top
  }
}

export default transformCoordinates
