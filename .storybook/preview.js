import { addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import '../src/styles/index.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const wrapperStyle = {
  padding: '20px 40px'
};

const storyWrapper = (storyFn) => (
  <div style={wrapperStyle}>
    <h3>Component Demo</h3>
    {storyFn()}
  </div>
);

addDecorator(storyWrapper);
addDecorator(withInfo);
addParameters({
  info: { inline: true, header: false,  }
});
