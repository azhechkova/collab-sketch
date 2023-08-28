import type { RoomType } from '@/types'

/**
 * Updates the image of a room on the specified canvas element.
 *
 * @param {HTMLCanvasElement | null} canvasRef - The reference to the HTML canvas element where the room image will be updated.
 * @param {RoomType} room - The room object containing information about the image and other room properties.
 * @returns {void}
 */

const updateRoomImage = (canvasRef: HTMLCanvasElement | null, room: RoomType): void => {
  if (!canvasRef) return

  const context = canvasRef.getContext('2d')
  if (!context) return

  context.clearRect(0, 0, canvasRef!.width, canvasRef!.height)
  context.beginPath()

  if (room.image) {
    const image = new Image()

    image.onload = function () {
      context.drawImage(image, 0, 0)
    }
    image.src = room.image
  }
}

export default updateRoomImage
