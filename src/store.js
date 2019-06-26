import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunkMiddleware from 'redux-thunk'

const reducer = (state={}, action) => {
  switch (action.type) {
    default:
      console.log('hi action', action, state)
      return {
        a: 'abc'
      }
  }
}

const store = createStore(combineReducers({reducer}), {}, applyMiddleware(reduxThunkMiddleware))

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