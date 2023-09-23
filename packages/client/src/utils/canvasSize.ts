const toVirtualX = (xReal: number, offsetX: number, scale: number): number => {
  return (xReal + offsetX) * scale
}

const toVirtualY = (yReal: number, offsetY: number, scale: number): number => {
  return (yReal + offsetY) * scale
}

const toRealX = (xVirtual: number, offsetX: number, scale: number): number => {
  return xVirtual / scale - offsetX
}

const toRealY = (yVirtual: number, scale: number, offsetY: number): number => {
  return yVirtual / scale - offsetY
}

const virtualHeight = (canvas: HTMLCanvasElement, scale: number) => {
  return canvas?.clientHeight / scale
}

const virtualWidth = (canvas: HTMLCanvasElement, scale: number) => {
  return canvas?.clientWidth / scale
}

export { toVirtualX, toVirtualY, toRealX, toRealY, virtualHeight, virtualWidth }
