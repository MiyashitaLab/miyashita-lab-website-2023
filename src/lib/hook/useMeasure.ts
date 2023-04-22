import { useLayoutEffect, useMemo, useState } from "react";

// from: https://github.com/streamich/react-use/blob/master/src/useMeasure.ts#L38

export type UseMeasureRect = Pick<
  DOMRectReadOnly,
  "x" | "y" | "top" | "left" | "right" | "bottom" | "height" | "width"
>;

const defaultState: UseMeasureRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

type UseMeasureResult<T extends HTMLElement> = [
  (node: T) => void,
  UseMeasureRect
];

const _useMeasure = <T extends HTMLElement>(): UseMeasureResult<T> => {
  const [element, ref] = useState<T | null>(null);
  const [rect, setRect] = useState<UseMeasureRect>(defaultState);

  const observer = useMemo(() => {
    return new ResizeObserver((entries) => {
      if (entries[0]) {
        const { x, y, width, height, top, left, bottom, right } =
          entries[0].contentRect;
        setRect({ x, y, width, height, top, left, bottom, right });
      }
    });
  }, []);

  useLayoutEffect(() => {
    if (element === null) return;
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [element, observer]);

  return [ref, rect];
};

// ssr時はwindowがないのでuseMeasureを使わないようにする

/**
 * 要素のサイズをResizeObserverで監視する
 */
export const useMeasure =
  typeof window !== "undefined"
    ? _useMeasure
    : () => [() => {}, defaultState] as UseMeasureResult<HTMLElement>;
