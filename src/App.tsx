import React from 'react';
import './styles/index.scss';
import Button, { ButtonSize, ButtonType } from './components/Button/Button';
import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button
          btnType={ButtonType.Link}
          href="https://www.google.com"
          disabled
        >
          google
        </Button>

        <Button
          btnType={ButtonType.Link}
          href="https://www.google.com"
          target='_blank'
        >
          google
        </Button>

        <Button>
          Button
        </Button>

        <Button size={ButtonSize.Large}>
          Large Button
        </Button>

        <Button size={ButtonSize.Small}>
          Small Button
        </Button>

        <Button btnType={ButtonType.Primary}>
          Primary Button
        </Button>
        
        <Button btnType={ButtonType.Danger}>
          Danger Button
        </Button>

        <Button disabled>
          Disabled Button
        </Button>

        <br />

        <div style={{ margin: 32 }}>
          <Menu
            defaultIndex={1}
            onSelect={num => console.log(num)}
          >
            {
              ['item-a', 'item-b', 'item-c'].map((str, index) => (
                <MenuItem
                  key={str}
                  index={index}
                  disabled={index === 1}

                >
                  {str}
                </MenuItem>
              ))
            }
            <li>kkk</li>
          </Menu>

          <Menu
            mode='vertical'
            defaultIndex={1}
            onSelect={num => console.log(num)}
          >
            {
              ['item-a-vertical', 'item-b-vertical', 'item-c-vertical'].map((str, index) => (
                <MenuItem
                  key={str}
                  index={index}
                  disabled={index === 1}

                >
                  {str}
                </MenuItem>
              ))
            }
          </Menu>
        </div>

        <h1>h1</h1>
        <h3>h3</h3>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <code>const str = 'Hello world';</code>
        <hr />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
