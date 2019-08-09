import { put, select, takeLatest } from 'redux-saga/effects'

function* sagaWorker(actions) {
  console.log(actions, 'abc');
}

export default function* watch() {
  console.log('hello')
  yield takeLatest('HELLO_ACTION', sagaWorker);
}
