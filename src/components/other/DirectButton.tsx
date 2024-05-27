import styled, { x } from '@xstyled/emotion';
import { Button, ButtonProps } from 'anolis-ui';
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';

export interface DirectButtonProps extends Omit<ButtonProps, 'v'> {
  v?: 'solid' | 'outline' | 'clear' | 'gradient' | 'link';
}

export const DirectButton: FC<PropsWithChildren<DirectButtonProps>> = ({
  children,
  v,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [buttonHeight, setButtonHeight] = useState<number>(0);

  useEffect(() => {
    setButtonHeight(ref.current?.clientHeight ?? 0);
  }, []);

  return (
    <Button
      v={v === 'gradient' ? 'solid' : v}
      {...(v === 'gradient' && {
        background: {
          _: 'linear-gradient(28deg, rgba(90,83,225,1) 0%, rgba(204,126,255,1) 72%, rgba(192,137,242,1) 100%)',
          hover:
            'linear-gradient(28deg, rgba(131,127,241,1) 0%, rgba(213,154,255,1) 72%, rgba(203,173,241,1) 100%)',
          focus:
            'linear-gradient(28deg, rgba(90,83,225,1) 0%, rgba(204,126,255,1) 72%, rgba(192,137,242,1) 100%)',
          active:
            'linear-gradient(28deg, rgba(65,56,237,1) 0%, rgba(194,101,255,1) 72%, rgba(178,125,244,1) 100%)',
        },
        border: { _: 0, focus: '0px solid' },
        borderColor: {
          _: 'transparent',
          hover: 'transparent',
          focus: 'transparent',
          active: 'transparent',
        },
        position: 'relative',
        m: '1px',
      })}
      ref={ref}
      data-group
      {...props}
    >
      {children}

      {v === 'gradient' && (
        <GradientBorderStyle
          display="block"
          opacity={{ _: 0, groupFocus: 1 }}
          buttonHeight={buttonHeight}
        />
      )}
    </Button>
  );
};

export default DirectButton;

// Remove buttonHeight prop from the DOM to prevent React warning
const GradientBorderStyle = styled(x.span, {
  shouldForwardProp: (prop) => prop !== 'buttonHeight',
})<{
  buttonHeight: number;
}>`
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  position: absolute;
  transition: opacity 300ms;

  background-position:
    top left,
    top center,
    top right,
    center right,
    bottom right,
    bottom center,
    bottom left,
    center left;

  ${(props) =>
    props.buttonHeight &&
    `
      background-image: radial-gradient(
          circle at 100% 100%,
          transparent ${props.buttonHeight / 2 - 1}px,
          #5a53e1 ${props.buttonHeight / 2 - 1}px,
          #5a53e1 ${props.buttonHeight / 2}px,
          transparent ${props.buttonHeight / 2}px
        ),
        linear-gradient(to right, #5a53e1, #cc7eff),
        radial-gradient(
          circle at 0% 100%,
          transparent ${props.buttonHeight / 2 - 1}px,
          #cc7eff ${props.buttonHeight / 2 - 1}px,
          #cc7eff ${props.buttonHeight / 2}px,
          transparent ${props.buttonHeight / 2}px
        ),
        linear-gradient(to bottom, #cc7eff, #5a53e1),
        radial-gradient(
          circle at 0% 0%,
          transparent ${props.buttonHeight / 2 - 1}px,
          #5a53e1 ${props.buttonHeight / 2 - 1}px,
          #5a53e1 ${props.buttonHeight / 2}px,
          transparent ${props.buttonHeight / 2}px
        ),
        linear-gradient(to left, #5a53e1, #cc7eff),
        radial-gradient(
          circle at 100% 0%,
          transparent ${props.buttonHeight / 2 - 1}px,
          #cc7eff ${props.buttonHeight / 2 - 1}px,
          #cc7eff ${props.buttonHeight / 2}px,
          transparent ${props.buttonHeight / 2}px
        ),
        linear-gradient(to top, #cc7eff, #5a53e1);

      background-size: ${props.buttonHeight / 2}px ${props.buttonHeight / 2}px,
        calc(100% - (2 * ${props.buttonHeight / 2}px)) 1px, ${props.buttonHeight / 2}px ${props.buttonHeight / 2}px,
        1px calc(100% - (2 * ${props.buttonHeight / 2}px));
    `}

  background-repeat: no-repeat;
`;
