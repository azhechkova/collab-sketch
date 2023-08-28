type ColorType = { label: string; value: string }

type RoomType = {
  name: string
  image?: string | null
  _id: string
  createdAt: number
  updatedAt: number
}

type CreateRoomType = Pick<RoomType, 'name'>

type Coordinates = {
  x: number
  y: number
}

type DrawReq = {
  prev?: Coordinates
  point: Coordinates
  color: string | CanvasGradient | CanvasPattern
  size: number
  roomId?: string
}

export type { ColorType, RoomType, CreateRoomType, DrawReq, Coordinates }
