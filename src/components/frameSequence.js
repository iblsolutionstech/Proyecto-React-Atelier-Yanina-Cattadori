// Orden de colgado de la pared: cada posicion define el lugar, el tipo de marco y su inclinacion.
export const FRAME_SEQUENCE = [
  { slot: 'a', frame: 'wood', tilt: -0.8 },
  { slot: 'b', frame: 'oval', tilt: 0.6 },
  { slot: 'c', frame: 'brass', tilt: -0.5 },
  { slot: 'd', frame: 'mat', tilt: 0.9 },
  { slot: 'e', frame: 'walnut', tilt: -0.6 },
]

export function getFrame(index) {
  return FRAME_SEQUENCE[index % FRAME_SEQUENCE.length]
}
