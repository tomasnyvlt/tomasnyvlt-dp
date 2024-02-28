import { RefObject, useEffect, useMemo, useState } from 'react';

const useOnScreen = (ref: RefObject<HTMLDivElement>) => {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      ),
    [ref]
  );

  useEffect(() => {
    if (!ref.current) {
      return undefined;
    }
    observer.observe(ref.current as HTMLDivElement);
    return () => observer.disconnect();
  }, [ref]);

  return isIntersecting;
};

export { useOnScreen };
