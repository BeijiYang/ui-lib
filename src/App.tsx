import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnchor } from '@fortawesome/free-solid-svg-icons';
import './styles/index.scss';
import Button, { ButtonSize, ButtonType } from './components/Button/Button';
import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon icon={faAnchor} size="3x" />
        <hr />
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
            defaultIndex={'1'}
            onSelect={num => console.log(num)}
          >
            {
              ['item-a', 'item-b', 'item-c'].map((str, index) => (
                <MenuItem
                  key={str}
                  disabled={index === 2}

                >
                  {str}
                </MenuItem>
              ))
            }
          </Menu>

          <Menu
            mode='vertical'
            defaultIndex={'1'}
            onSelect={num => console.log(num)}
          >
            {
              ['item-a-vertical', 'item-b-vertical', 'item-c-vertical'].map((str, index) => (
                <MenuItem
                  key={str}
                  disabled={index === 2}

                >
                  {str}
                </MenuItem>
              ))
            }
          </Menu>

          <Menu
            defaultIndex={'1'}
            onSelect={num => console.log(num)}
          >
            <MenuItem>
              Item One
            </MenuItem>
            <SubMenu title="Dropdown">
              <MenuItem>
                Dropdown One
              </MenuItem>
              <MenuItem>
                Dropdown Two
              </MenuItem>
            </SubMenu>
            <MenuItem>
              Item Three
            </MenuItem>
          </Menu>

          <Menu
            defaultIndex={'1'}
            onSelect={num => console.log(num)}
            mode='vertical'
            defaultOpenSubMenus={['1']}
          >
            <MenuItem>
              Item One
            </MenuItem>
            <SubMenu title="Dropdown">
              <MenuItem>
                Dropdown One
              </MenuItem>
              <MenuItem>
                Dropdown Two
              </MenuItem>
            </SubMenu>
            <MenuItem>
              Item Three
            </MenuItem>
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
