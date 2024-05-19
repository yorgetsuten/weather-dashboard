export function debounce<F extends (...args: any[]) => void>(
  fn: F,
  ms: number = 300
) {
  let timeout: ReturnType<typeof setTimeout> | undefined = undefined

  return (...args: Parameters<F>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, ms)
  }
}
