import React from 'react';
import { Provider } from 'react-redux';
import store from './store'
import logo from './logo.svg';
import './App.css';
import './store';
import './utils/signalr_init';
import word from './utils/word';
import X from './components/Demo';
import './App.css';

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
