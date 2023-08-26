type Coordinates = {
  x: number;
  y: number;
};

type DrawReq = {
  prev: Coordinates;
  point: Coordinates;
  color: string;
  size: number;
  room: string;
};

export type { DrawReq };
