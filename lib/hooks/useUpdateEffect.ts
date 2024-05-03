import { useEffect } from "react";
import { useFirstMountState } from "./useFirstMountState";
export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const firstMountState = useFirstMountState();

  useEffect(() => {
    if (!firstMountState) {
      return effect();
    }
  }, deps);
};
