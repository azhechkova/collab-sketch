import type { ActionMode } from '@/types'

const EDITOR_DEFAULT_SETTINGS = {
  size: 1,
  color: '#000'
}

const ACTION_MODES: Record<string, ActionMode> = {
  select: 'select',
  pan: 'pan',
  draw: 'draw'
}

const DEFAULT_ZOOM = 1

const MIN_ZOOM = 0.25
const MAX_ZOOM = 2

export { EDITOR_DEFAULT_SETTINGS, ACTION_MODES, DEFAULT_ZOOM, MIN_ZOOM, MAX_ZOOM }
