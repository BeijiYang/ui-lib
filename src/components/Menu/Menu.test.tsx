import React from 'react';
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react';
import Menu, { MenuProps } from './Menu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test-class',
};

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  onSelect: jest.fn(),
};

const testDefaultOpenSubMenusVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  onSelect: jest.fn(),
  defaultOpenSubMenus: ['3'],
};

const renderMenuToTest = (props: MenuProps) => (
  <Menu {...props}>
    <MenuItem>
      active
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem>
    <MenuItem>
      not active
    </MenuItem>
    <SubMenu title="dropdown">
      <MenuItem>
        dropdown-0
      </MenuItem>
    </SubMenu>
  </Menu>
);

const createStyleFile = () =>{
  const styleFile: string = `
    .yj-submenu {
      display: none;
    }
    .yj-submenu.yj-menu-opened {
      display: block;
    }
  `;
  const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styleFile;
  return style;
};

let wrapper: RenderResult,
    menuElement: HTMLElement, 
    activeElement: HTMLElement, 
    disabledElement: HTMLElement;

describe('Menu and MenuItem components', () => {
  beforeEach(() => {
    wrapper = render(renderMenuToTest(testProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId('menu-ul');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });

  it('should render correct component based on provided props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('yj-menu test-class');
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
    expect(activeElement).toHaveClass('yj-menu-item is-active');
    expect(disabledElement).toHaveClass('yj-menu-item is-disabled');
  });

  it('clicking item should change the active status and call the callback function', () => {
    const thirdMenuItem = wrapper.getByText('not active');
    expect(thirdMenuItem).not.toHaveClass('is-active');
    // click the third menu item
    fireEvent.click(thirdMenuItem);
    expect(thirdMenuItem).toHaveClass('is-active');
    expect(menuElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    // click the disabled meun item
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });

  it('should show dropdown items when hovering on the SubMenu', async () => {
    expect(wrapper.queryByText('dropdown-0')).not.toBeVisible();
    const subMenuElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(subMenuElement);
    await waitFor(() => {
      expect(wrapper.queryByText('dropdown-0')).toBeVisible();
    });
    fireEvent.click(wrapper.getByText('dropdown-0'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(subMenuElement);
    await waitFor(() => {
      expect(wrapper.queryByText('dropdown-0')).not.toBeVisible();
    });
  });

  it('should vertical Menu under vertical mode', () => {
    cleanup();
    wrapper = render(renderMenuToTest(testVerticalProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId('menu-ul');
    expect(menuElement).toHaveClass('yj-menu-vertical');
  });

  it('should show dropdown items when clicking the SubMenu on vertical mode', () => {
    cleanup();
    wrapper = render(renderMenuToTest(testVerticalProps));
    wrapper.container.append(createStyleFile());
    expect(wrapper.queryByText('dropdown-0')).not.toBeVisible();
    const subMenuElement = wrapper.getByText('dropdown');
    fireEvent.click(subMenuElement);
    expect(wrapper.queryByText('dropdown-0')).toBeVisible();
    fireEvent.click(wrapper.getByText('dropdown-0'));
    expect(testVerticalProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.click(subMenuElement);
    expect(wrapper.queryByText('dropdown-0')).not.toBeVisible();
  });

  it('should show specified dropdown items by default when defaultOpenSubMenus prop is provided on vertical mode', () => {
    cleanup();
    wrapper = render(renderMenuToTest(testDefaultOpenSubMenusVerticalProps));
    wrapper.container.append(createStyleFile());
    expect(wrapper.queryByText('dropdown-0')).toBeVisible();
    fireEvent.click(wrapper.getByText('dropdown-0'));
    expect(testDefaultOpenSubMenusVerticalProps.onSelect).toHaveBeenCalledWith('3-0');
    const subMenuElement = wrapper.getByText('dropdown');
    fireEvent.click(subMenuElement);
    expect(wrapper.queryByText('dropdown-0')).not.toBeVisible();
  });
});
