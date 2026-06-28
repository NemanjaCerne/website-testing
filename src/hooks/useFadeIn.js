import { useEffect, useRef } from 'react'

export function useFadeIn(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.12, ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

export function useFadeInChildren(selector = '[data-animate]', stagger = 100) {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const children = Array.from(container.querySelectorAll(selector))

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            setTimeout(() => child.classList.add('is-visible'), i * stagger)
          })
          observer.unobserve(container)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return ref
}
