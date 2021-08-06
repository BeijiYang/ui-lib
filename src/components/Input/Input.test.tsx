import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input, { InputProps } from './Input';

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input'
};

describe('Input Component', () => {
  it('should render a default Input', () => {
    const wrapper = render(<Input {...defaultProps} />);
    const testNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement;
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass('yj-input-inner');

    fireEvent.change(testNode, { target: { value: '69' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(testNode.value).toEqual('69');
  });

  it('should render a disabled Input', () => {
    const wrapper = render(<Input disabled placeholder="disabled input" />);
    const testNode = wrapper.getByPlaceholderText('disabled input') as HTMLInputElement;
    expect(testNode.disabled).toBeTruthy();
  });

  it('should render inputs with different sizes', () => {
    const wrapper = render(<Input placeholder="sizes" size="lg" />);
    const testContainer = wrapper.container.querySelector('.yj-input-wrapper');
    expect(testContainer).toHaveClass('yj-input-size-lg');
  });

  it('should render input witg prefix and suffix elements', () => {
    const { queryByText, container } = render(
      <Input 
        placeholder="input with affix"
        prefix="https://"
        suffix=".com"
      />
    );
    const testContainer = container.querySelector('.yj-input-wrapper');
    expect(testContainer).toHaveClass('yj-input-group yj-input-group-suffix yj-input-group-prefix');
    expect(queryByText('https://')).toBeInTheDocument();
    expect(queryByText('.com')).toBeInTheDocument();
  });
});
