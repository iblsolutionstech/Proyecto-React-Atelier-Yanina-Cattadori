import { useEffect } from 'react'

// Una sola luz: con mouse sigue al puntero; en pantallas tactiles o con movimiento reducido queda fija.
function Lamp() {
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!finePointer.matches || reducedMotion.matches) return undefined

    const root = document.documentElement
    let frame = 0
    let x = 0
    let y = 0

    const handleMove = (event) => {
      x = event.clientX
      y = event.clientY

      if (frame) return

      frame = requestAnimationFrame(() => {
        root.style.setProperty('--lx', `${x}px`)
        root.style.setProperty('--ly', `${y}px`)
        frame = 0
      })
    }

    window.addEventListener('pointermove', handleMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handleMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <div className="lamp" aria-hidden="true" />
}

export default Lamp
