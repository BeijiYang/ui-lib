import React, { createContext, useState } from 'react';
import classNames from 'classnames';

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
    'menu',
    className,
    { 'menu-vertical': mode === 'vertical' }
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
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
};

export default Menu;