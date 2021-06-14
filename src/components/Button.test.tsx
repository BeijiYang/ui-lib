import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps, ButtonType ,ButtonSize } from './Button';

const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'klass'
}

const linkProps: ButtonProps = {
  btnType: ButtonType.Link,
  href: 'https://dummyURL'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe('Button component', () => {
  it('should render a default button component', () => {
    const wrapper = render(
      <Button {...defaultProps}>
        Default Button
      </Button>
    );
    const element = wrapper.getByText('Default Button') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('BUTTON');
    expect(element.disabled).toBeFalsy();
    expect(element).toHaveClass('btn btn-default');
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('should render different class names based on different props', () => {
    const wrapper = render(
      <Button {...testProps}>
        Primary Button
      </Button>
    );
    const element = wrapper.getByText('Primary Button');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn btn-primary btn-lg klass')
  });

  it('should render a link when btnType is "Link" and a href is provided', () => {
    const wrapper = render(
      <Button {...linkProps}>
        Link Button
      </Button>
    );
    const element = wrapper.getByText('Link Button');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('A');
    expect(element).toHaveClass('btn btn-link');
    expect(element).toHaveProperty('href');
  });

  it('should render a disabled button when disabled is true', () => {
    const wrapper = render(
      <Button {...disabledProps}>
        Disabled Button
      </Button>
    );
    const element = wrapper.getByText('Disabled Button') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});

