import React, { useState } from 'react';
import Icon from './components/Icon/Icon';
import './styles/index.scss';
import Button from './components/Button/Button';
import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';
import Transition from './components/Transition/Transition';

function App() {
  const [hide, setHide] = useState(true);
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="anchor" size="3x" theme="dark" />
        <hr />
        <Button
          btnType={'link'}
          href="https://www.google.com"
          disabled
        >
          google
        </Button>

        <Button
          btnType={'link'}
          href="https://www.google.com"
          target='_blank'
        >
          google
        </Button>

        <Button>
          Button
        </Button>

        <Button size={'lg'}>
          Large Button
        </Button>

        <Button size={'sm'}>
          Small Button
        </Button>

        <Button btnType={'primary'}>
          Primary Button
        </Button>
        
        <Button btnType={'danger'}>
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
        <Button size='lg' onClick={() => setHide(!hide)}>Transition Test</Button>
        <Transition
          in={!hide}
          timeout={300}
          animation='zoom-in-bottom'
        >
          <h3>Transition Test Content</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, nemo. Culpa delectus labore deserunt in vel minima totam numquam natus sapiente, a nesciunt maxime similique porro dolores necessitatibus earum. Nihil.</p>
        </Transition>
        <Transition
          in={!hide}
          timeout={300}
          animation='zoom-in-bottom'
        >
          <Button>Transition Test Content</Button>
        </Transition>
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
