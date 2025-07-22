import React, { useEffect } from 'react';

export const useOnClickOutside = <T extends Element>(
  ref: React.RefObject<T | null>,
  callback: (e: MouseEvent | TouchEvent) => void,
) => {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        callback(e);
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [callback, ref]);
};
