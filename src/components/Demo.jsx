import React from 'react';
import { connect, Provider } from 'react-redux'
import { bindActionCreators } from 'redux'
import store from '../store'
import * as actions from '../store/action'

const mapStateToProps = state => {
  return {
    todos: state //(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
}

function promiseAction(action, payload = {}, timeout) {
  return new Promise(function(resolve) {
    action({ ...payload, cb: resolve }, {a: 'hello'});
    if (timeout) {
      setTimeout(resolve, timeout);
    }
  })
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class X extends React.Component {
  componentDidMount() {
    // if (this.props.hello) {
    //   this.props.hello({ test: 'haha' })
    // }
    // this.props.hello2()
  }

  hello = async () => {
    // console.log(this)
    // this.props.hello()
    // await this.props.helloasync()
    const a = await promiseAction(this.props.hello, {sayHello: 'hello'});
    console.log(a)
  }

  render() {
    // console.log('props', this.props)
    return <div>
      <div>hello</div>
      <button onClick={this.hello}>hello</button>
      <button onClick={this.props.aaa}>aaa</button>
      <button onClick={this.props.abc}>abc</button>
    </div>
  }
}

export default X;

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(X);