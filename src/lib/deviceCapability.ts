// Detecta dispositivos de gama baja (pocos núcleos de CPU y/o poca RAM) para
// degradar animaciones costosas (filter: blur, backdrop-filter) sin afectar
// la experiencia en dispositivos capaces. Se calcula una sola vez por sesión.
//
// navigator.deviceMemory solo existe en Chrome/Android — en Safari/iOS será
// undefined y no penaliza (asumimos capaz salvo que hardwareConcurrency diga
// lo contrario).
function detectLowEndDevice(): boolean {
  if (typeof navigator === 'undefined') return false

  const cores = navigator.hardwareConcurrency ?? 8
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8

  return cores <= 4 || memory <= 4
}

export const isLowEndDevice = detectLowEndDevice()

// Devuelve el string de blur normal en dispositivos capaces, o `undefined`
// (propiedad omitida del todo) en gama baja — más barato que animar blur(0px).
export function adaptiveBlur(px: number): string | undefined {
  return isLowEndDevice ? undefined : `blur(${px}px)`
}
