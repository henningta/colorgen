// https://decipher.dev/30-seconds-of-typescript/docs/debounce
export const debounce = (callback: (...args: any[]) => void, ms = 50) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), ms);
  };
};

// https://decipher.dev/30-seconds-of-typescript/docs/throttle
export const throttle = (callback: (...args: any[]) => void, ms = 50) => {
  let inThrottle: boolean;
  let lastFn: ReturnType<typeof setTimeout>;
  let lastTime: number;

  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      callback.apply(this, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);

      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= ms) {
          callback.apply(this, args);
          lastTime = Date.now();
        }
      }, Math.max(ms - (Date.now() - lastTime), 0));
    }
  };
};
