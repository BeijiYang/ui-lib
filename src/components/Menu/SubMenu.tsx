import React, { useContext, FunctionComponentElement, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './Menu';
import { MenuItemProps } from './MenuItem';
import Icon from '../Icon/Icon';
import Transition from '../Transition/Transition';

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  className,
  children
}) => {
  const context = useContext(MenuContext);
  const openedSubMenu = context.defaultOpenSubMenus as Array<string>;
  const isOpened = (index && context.mode === 'vertical')
                    ? openedSubMenu.includes(index)
                    : false;
  const [menuOpen, setMeunOpen] = useState(isOpened);
  
  const classes = classNames(
    'yj-menu-item yj-submenu-item',
    className,
    {
      'is-active': context.index === index,
      'is-opened': menuOpen,
      'is-vertical': context.mode === 'vertical'
    }
  );

  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setMeunOpen(!menuOpen);
  };

  let timer: any;
  const handleMouse = (evt: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    evt.preventDefault();
    timer = setTimeout(() => {
      setMeunOpen(toggle);
    }, 300);
  };

  const clickEvents = context.mode === 'vertical'
                        ? { onClick: handleClick }
                        : {}

  const hoverEvents = context.mode !== 'vertical'
                        ? {
                            onMouseEnter: (evt: React.MouseEvent) => { handleMouse(evt, true) },
                            onMouseLeave: (evt: React.MouseEvent) => { handleMouse(evt, false) }
                          }
                        : {}

  // render & filter non-menu-item stuff
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        });
      } else {
        console.error('Warning: Menu contains a child that is not a MeunItem component.');
      }
    });
    return (
      <div className={'yj-submenu-wrapper'}>
        <Transition
          in={menuOpen}
          timeout={300}
          animation="zoom-in-top"
          
        >
          <ul className={'yj-submenu'}>
            {childrenComponent}
          </ul>
        </Transition>
      </div>
    );
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div
        className="yj-submenu-title"
        onClick={handleClick}
        {...clickEvents}
      >
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  ); 
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
