const debounce = <T>(func: (...args: T[]) => unknown, delay = 300, leading = false): typeof func => {
  let timerId: ReturnType<typeof setTimeout>;

  // eslint-disable-next-line func-names
  return function (...args: T[]) {
    if (!timerId && leading) {
      func(...args);
    }

    clearTimeout(timerId);
    timerId = setTimeout(() => func(...args), delay);
  };
};

export default debounce;
