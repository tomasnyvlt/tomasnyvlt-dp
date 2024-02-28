import { AnimatePresence, motion } from "framer-motion";
import { FC, PropsWithChildren, useId } from "react";

interface AnimatedContentProps {
  isOpen?: boolean;
  duration?: number;
  withoutDelay?: boolean;
}

const AnimatedContent: FC<PropsWithChildren<AnimatedContentProps>> = ({
  isOpen,
  duration = 0.3,
  withoutDelay = false,
  children
}) => {
  const id = useId();

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, overflow: "hidden" }}
          animate={{ opacity: 1, height: "auto", overflow: "visible" }}
          transition={{ duration, delay: withoutDelay ? 0 : duration }}
          key={id}
          exit={{
            opacity: 0,
            height: 0,
            transition: { duration },
            overflow: "hidden"
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedContent;
