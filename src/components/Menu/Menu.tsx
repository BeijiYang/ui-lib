import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './MenuItem';

type MenuMode = 'horizontal' | 'vertical';
type SelectFn = (selectedIndex: number) => void;

export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectFn;
};

interface IMenuContext {
  index: number;
  onSelect?: SelectFn;
  mode?: MenuMode;
};

export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: React.FC<MenuProps> = ({
  className,
  mode,
  style,
  defaultIndex,
  onSelect,
  children
}) => {
  const [curActive, setCurActive] = useState(defaultIndex);

  const classes = classNames(
    'yj-menu',
    className,
    {
      'yj-menu-vertical': mode === 'vertical',
      'yj-menu-horizontal': mode !== 'vertical'
    }
  );

  const handleClick = (index: number) => {
    setCurActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  
  const passedContext: IMenuContext = {
    index: curActive || 0,
    onSelect: handleClick,
    mode,
  };

  const renderChildren = () => React.Children.map(
    children,
    (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { type: { displayName } } = childElement;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index });
      } else {
        console.error('Warning: Menu contains a child that is not a MeunItem component.');
      }
    }
  );

  return (
    <ul
      className={classes}
      style={style}
      data-testid='menu-ul'
    >
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
};

export default Menu;