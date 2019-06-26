import React from 'react';
import { connect, Provider } from 'react-redux'
import { bindActionCreators } from 'redux'
import store from '../store'
import * as actions from '../actions'

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

  hello = () => {
    console.log(this)
  }

  render() {
    console.log('props', this.props)
    return <div>
      <div>hello</div>
      <button onClick={this.hello}>click</button>
    </div>
  }
}

export default X;

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(X);