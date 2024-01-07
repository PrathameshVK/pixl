export const debounce = (func, wait) => {
  let timer = null;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      const result = func(...args);
      timer = null;
      return result;
    }, wait);
  };
};
