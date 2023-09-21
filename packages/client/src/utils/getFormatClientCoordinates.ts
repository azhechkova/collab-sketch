import type { PointerOrTouchEvent } from '@/types'

export default function getFormatClientCoordinates(event: PointerOrTouchEvent) {
  const clientX = 'clientX' in event ? event.clientX : event.touches[0]?.clientX
  const clientY = 'clientY' in event ? event.clientY : event.touches[0]?.clientY

  return { clientX, clientY }
}
