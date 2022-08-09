// https://decipher.dev/30-seconds-of-typescript/docs/debounce/
export const debounce = (callback: (...args: any[]) => void, ms = 50) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), ms);
  };
};
