import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './Button';

const styles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  height: '50vh',
};

const defaultButton = () => (
  <div style={styles}>
    <Button onClick={action('clicked')}>
      Default Button
    </Button>
    <Button onClick={action('clicked')} disabled>
      Disabled Button
    </Button>
  </div>
);

const buttonWithSize = () => (
  <div style={styles}>
    <Button size='lg'>
      Large Button
    </Button>
    <Button size='sm'>
      Small Button
    </Button>
  </div>
);

const buttonWithType = () => (
  <div style={styles}>
    <Button btnType='default'>
      Default Button
    </Button>
    <Button btnType='primary'>
      Primary Button
    </Button>
    <Button btnType='danger'>
      Danger Button
    </Button>
    <Button
      btnType='link'
      href="https://www.google.com">
      Link Button
    </Button>
    <Button
      btnType='link'
      href="https://www.google.com"
      target='_blank'
    >
      Link Button (target _blank)
    </Button>
  </div>
);

storiesOf('Button Component', module)
  .add('Default Button', defaultButton)
  .add('Buttons with different sizes', buttonWithSize)
  .add('Buttons with different types', buttonWithType);
