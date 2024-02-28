import { x } from "@xstyled/emotion";
import { SingleValueProps, components } from "react-select";

import AnimatedContent from "@src/components/contents/AnimatedContent";
import { OptionDecorDataType } from "@src/types";

const ANIMATION_DURATION = 0.5;

const SingleValue = (props: SingleValueProps<OptionDecorDataType>) => {
  const { children, selectProps } = props;
  const { menuIsOpen, placeholder } = selectProps;

  return (
    <components.SingleValue {...props}>
      <AnimatedContent isOpen={menuIsOpen} duration={ANIMATION_DURATION} withoutDelay>
        <x.div overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
          {placeholder}
        </x.div>
      </AnimatedContent>

      <AnimatedContent isOpen={!menuIsOpen} duration={ANIMATION_DURATION} withoutDelay>
        <x.div overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
          {children}
        </x.div>
      </AnimatedContent>
    </components.SingleValue>
  );
};

export default SingleValue;
