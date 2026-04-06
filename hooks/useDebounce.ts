import { useEffect, useRef, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestCallbackRef = useRef<T>(callback);

  // Keep latest callback (avoid stale closure)
  useEffect(() => {
    latestCallbackRef.current = callback;
  }, [callback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        latestCallbackRef.current(...args);
      }, delay);
    },
    [delay],
  );

  return debouncedCallback;
};

export default useDebounce;
