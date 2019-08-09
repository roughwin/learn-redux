import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import reduxThunkMiddleware from 'redux-thunk'

const reducer = (state={}, action) => {
  switch (action.type) {
    default:
      return {
        a: 'abc'
      }
  }
}

const reducer2 = (state = {}, action) => {
  switch(action.type) {
    default:
      return {
        b: new Date()
      }
  }
}


const myMiddelware2 = store => next => action => {
  console.log('middleware 2')
  return next(action);
}


const myMiddelware = store => next => action => {
  console.log('middleware 1', action)
  if (action instanceof Promise) {
    return action.then((x) => {
      next(x)
    });
  } else {
    return next(action);
  }
}

const isProduction = process.env.NODE_ENV === 'production';
const reduxDevtool = (window.__REDUX_DEVTOOLS_EXTENSION__ && !isProduction) ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
const store = createStore(
  combineReducers({reducer, reducer2}),
  {},
  compose(
    // applyMiddleware(myMiddelware2),
    applyMiddleware(myMiddelware),
    applyMiddleware(reduxThunkMiddleware),
    reduxDevtool
  )
)

export default store;

// const unsubscribe = store.subscribe(() => console.log('getstate', store.getState()))

// store.dispatch({type: '123'})
// store.dispatch(() => ({type: '123'}))
// // store.dispatch(addTodo('Learn about reducers'))
// // store.dispatch(addTodo('Learn about store'))
// // store.dispatch(toggleTodo(0))
// // store.dispatch(toggleTodo(1))
// // store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// // Stop listening to state updates
// unsubscribe()