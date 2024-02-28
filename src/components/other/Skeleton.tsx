import styled, { css, x } from '@xstyled/emotion';
import { FC } from 'react';
import ReactSkeleton, {
  SkeletonProps as ReactSkeletonProps,
} from 'react-loading-skeleton';

interface SkeletonProps {
  skeletonProps?: ReactSkeletonProps;
  h?: string;
  skeletonColor?: 'purple';
}
const Skeleton: FC<SkeletonProps> = ({ skeletonProps, skeletonColor, h }) => {
  return (
    <SkeletonStyle h={h} skeletonColor={skeletonColor}>
      <ReactSkeleton {...skeletonProps} />
    </SkeletonStyle>
  );
};

export default Skeleton;

const SkeletonStyle = styled(x.span)<{ skeletonColor?: 'purple' }>`
  display: block;
  line-height: 1;
  white-space: nowrap;

  @keyframes react-loading-skeleton {
    100% {
      transform: translateX(100%);
    }
  }

  .react-loading-skeleton {
    --base-color: #f2f5cc;
    --highlight-color: #dfe680;
    --animation-duration: 1.5s;
    --animation-direction: normal;
    --pseudo-element-display: block; /* Enable animation */

    background-color: var(--base-color);

    ${(props) =>
      props.skeletonColor === 'purple' &&
      css`
        --base-color-purple: #cc7eff;
        --highlight-color-purple: #5a53e1;
        background-color: var(--base-color-purple);
      `}

    width: 100%;
    border-radius: 0.25rem;
    display: inline-flex;
    line-height: 1;

    position: relative;
    overflow: hidden;
    z-index: 1; /* Necessary for overflow: hidden to work correctly in Safari */
  }

  .react-loading-skeleton::after {
    content: ' ';
    display: var(--pseudo-element-display);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-repeat: no-repeat;
    background-image: linear-gradient(
      90deg,
      var(--base-color),
      var(--highlight-color),
      var(--base-color)
    );
    ${(props) =>
      props.skeletonColor === 'purple' &&
      css`
        background-image: linear-gradient(
          90deg,
          var(--base-color-purple),
          var(--highlight-color-purple),
          var(--base-color-purple)
        );
      `}
    transform: translateX(-100%);

    animation-name: react-loading-skeleton;
    animation-direction: var(--animation-direction);
    animation-duration: var(--animation-duration);
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }
`;
