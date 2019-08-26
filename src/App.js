import React from 'react';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';
import store from './store'
import logo from './logo.svg';
import './App.css';
import './store';
import './utils/signalr_init';
import word from './utils/word';
import X from './components/Demo';
import AudioDemo from './components/audio';
import './App.css';

Sentry.init({dsn: "http://52e07db925d44fa2a4ed9e019f9eba2c@172.24.128.28:9000/2", release: '123'});

function App() {
  return (
      <Provider store={store}>
    <div className="App">
      <button
        onClick={() => {
          word.ready()
        }}
      >
       start
     </button>
      <button
        onClick={() => {
          word.requestWord(null, 1, 1, 'a', 'b')
        }}
      >
        click
      </button>
        <AudioDemo />
        <X></X>
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
      </Provider>
  );
}

export default App;
