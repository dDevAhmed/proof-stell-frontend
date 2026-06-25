import { useEffect, useRef } from "react";

type EventMap = WindowEventMap & DocumentEventMap & HTMLElementEventMap;

/**
 * A safe, generic event listener hook that automatically removes the listener
 * on cleanup, preventing accumulated listeners when components mount/unmount.
 *
 * @param eventName - The name of the event to listen for.
 * @param handler   - The callback to invoke when the event fires.
 * @param element   - The target element/object (defaults to `window`).
 * @param options   - Optional `addEventListener` options.
 */
export function useEventListener<K extends keyof EventMap>(
  eventName: K,
  handler: (event: EventMap[K]) => void,
  element: EventTarget = typeof window !== "undefined" ? window : ({} as EventTarget),
  options?: AddEventListenerOptions
): void {
  // Keep the handler in a ref so it never triggers the effect to re-run
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!element || typeof element.addEventListener !== "function") return;

    const listener = (event: Event) =>
      savedHandler.current(event as EventMap[K]);

    element.addEventListener(eventName, listener, options);

    return () => {
      element.removeEventListener(eventName, listener, options);
    };
    // options is intentionally omitted from deps — changes to it are rare and
    // would require an additional deep-compare; callers should memoize if needed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventName, element]);
}
