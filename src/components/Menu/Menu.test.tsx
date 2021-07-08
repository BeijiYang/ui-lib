import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import Menu, { MenuProps } from './Menu';
import MenuItem from './MenuItem';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test-class'
};

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
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
  </Menu>
);

let wrapper: RenderResult,
    menuElement: HTMLElement, 
    activeElement: HTMLElement, 
    disabledElement: HTMLElement;

describe('Menu and MenuItem components', () => {
  beforeEach(() => {
    wrapper = render(renderMenuToTest(testProps));
    menuElement = wrapper.getByTestId('menu-ul');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });

  it('should render correct component based on provided props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('yj-menu test-class');
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
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
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });

  it('should vertical Menu under vertical mode', () => {
    cleanup();
    wrapper = render(renderMenuToTest(testVerticalProps));
    menuElement = wrapper.getByTestId('menu-ul');
    expect(menuElement).toHaveClass('yj-menu-vertical');
  });
});
