import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-right' | 'zoom-in-left' | 'zoom-in-bottom';

type TransitionProps = CSSTransitionProps & { animation?: AnimationName };

const Transition: React.FC<TransitionProps> = ({
  children,
  classNames,
  animation,
  ...restProps
}) => {
  const nodeRef = React.useRef(null);
  return (
    <CSSTransition
      classNames={classNames || animation}
      nodeRef={nodeRef}
      {...restProps}
    >
      <div ref={nodeRef}>
          {children}
      </div>
    </CSSTransition>
)};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
};

export default Transition;
