import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import reduxThunkMiddleware from 'redux-thunk'
import { fork, all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga'

import * as saga from './saga';

import reducer from './reducer';

console.log(saga)

function generateFork(sagaArray) {
  return Object.keys(sagaArray).map(item => fork(sagaArray[item]));
}

function* root() {
  const sagaFork = generateFork(saga);
  yield all([sagaFork]);
}

const sagaMiddleware = createSagaMiddleware()

// export const rootReducer = combineReducers({
//   demo,
//   tree,
//   task,
//   chat,
// });


const isProduction = process.env.NODE_ENV === 'production';
const reduxDevtool = (window.__REDUX_DEVTOOLS_EXTENSION__ && !isProduction) ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f

const store = createStore(
  combineReducers({reducer}),
  {},
  compose(
    applyMiddleware(sagaMiddleware),
    // applyMiddleware(reduxThunkMiddleware),
    reduxDevtool
  )
)
sagaMiddleware.run(root)
export default store;
