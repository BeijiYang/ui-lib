import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from './Input';

const styles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  height: '50vh',
};

const ControlledInput = () => {
  const [value, setValue] = useState('');
  return (
    <Input
      value={value}
      defaultValue="default value"
      onChange={evt => setValue(evt.target.value)}
      style={{ width: '300px' }}
    />
  );
};

const defaultInput = () => (
  <div style={styles}>
    <Input
      style={{ width: '300px' }}
      placeholder="placeholder"
      onChange={action('changed')}
    />
    <ControlledInput />
  </div>
);

const disabledInput = () => (
  <Input
    style={{ width: '300px' }}
    placeholder="disabled input"
    disabled
  />
);

const iconInput = () => (
  <Input
    style={{ width: '300px' }}
    placeholder="input with icon"
    icon="search"
  />
);

const sizeInput = () => (
  <div style={styles}>
    <Input
      style={{ width: '300px' }}
      defaultValue="large size"
      size="lg"
    />
    <Input
      style={{ width: '300px' }}
      placeholder="small size"
      size="sm"
    />
  </div>
);

const affixInput = () => (
  <div style={styles}>
    <Input
      style={{ width: '300px' }}
      defaultValue="prepend text"
      prefix="https://"
    />
    <Input
      style={{ width: '300px' }}
      defaultValue="google"
      suffix=".com"
    />
  </div>
);


storiesOf('Input Component', module)
  .add('Default Input', defaultInput)
  .add('Disabled Input', disabledInput)
  .add('Input with Icon', iconInput)
  .add('Input with different sizes', sizeInput)
  .add('Input with affix', affixInput);
