import React from 'react';
import classNames from 'classnames';

export interface MenuItemProps {
  index?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const MenuItem: React.FC<MenuItemProps> = ({
  index,
  disabled,
  className,
  style,
  children
}) => {
  const classes = classNames(
    'meun-item',
    className,
    { 'is-disabled': disabled }
  );

  return (
    <li className={classes} style={style}>
      {children}
    </li>
  );
};

export default MenuItem;