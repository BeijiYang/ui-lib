import React, { useContext, FunctionComponentElement, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './Menu';
import { MenuItemProps } from './MenuItem';

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
  const [menuOpen, setMeunOpen] = useState(false);
  const context = useContext(MenuContext);
  const classes = classNames(
    'yj-menu-item yj-submenu-item',
    className,
    { 'is-active': context.index === index }
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
    const subMenuClasses = classNames('yj-submenu', {
      'yj-menu-opened': menuOpen,
    })

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
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
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
      </div>
      {renderChildren()}
    </li>
  ); 
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
