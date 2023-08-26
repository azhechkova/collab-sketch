import type { ColorInputWithoutInstance } from 'tinycolor2'

type ColorType = { label: string; value: string }

type RoomType = {
  name: string
  image?: string | null
  _id: string
}

type Coordinates = {
  x: number
  y: number
}

type DrawReq = {
  prev: Coordinates
  point: Coordinates
  color: ColorInputWithoutInstance
  size: number
  roomId: string
}

export type { ColorType, RoomType, DrawReq, Coordinates }
