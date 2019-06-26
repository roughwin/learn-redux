import React from 'react';
import { Provider } from 'react-redux';
import store from './store'
import logo from './logo.svg';
import './App.css';
import './store';

import X from './components/Demo';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <X></X>
      </Provider>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
