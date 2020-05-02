import { useEffect } from "react";

export function useUpdateOnResize(fn: () => void, deps: any) {
  useEffect(() => {
    window.addEventListener("resize", fn, { passive: true });

    return () => {
      window.removeEventListener("resize", fn);
    };
  }, [deps, fn]);
}
