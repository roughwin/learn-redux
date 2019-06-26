import React from 'react';
import { connect, Provider } from 'react-redux'
import { bindActionCreators } from 'redux'
import store from './store'
import * as actions from './actions'
import logo from './logo.svg';
import './App.css';
import './store';

const mapStateToProps = state => {
  return {
    todos: state //(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
  // return {
  //   onTodoClick: id => {
  //     dispatch({type: '123'})
  //   }
  // }
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class X extends React.Component {
  componentDidMount() {
    if (this.props.hello) {
      this.props.hello()
    }
    this.props.hello2()
  }

  render() {
    console.log('props', this.props)
    return <div>hello</div>
  }
}

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
