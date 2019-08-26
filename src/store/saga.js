import { put, select, takeLatest, take } from 'redux-saga/effects'

function* sagaWorker(actions) {
  const { payload } = actions;
  yield put({ type: 'hahah' });
  yield take('aaa');
  yield put({ type: 'hahah1' });
  if (payload && payload.cb) {
    payload.cb('finish')
  }
}

function* watchAaync(actions) {
  console.log(actions, 'watch async');
}

// export function* test() {
//   while(true) {
//     console.log('aaa')
//     yield take('aaa');
//     // yield take('continue');
//     yield put({type: 'hahah1212'});
//     console.log('finish')
//   }
// }

export function* watch() {
  console.log('hello')
  yield takeLatest('HELLO_ACTION', sagaWorker);
  // yield takeLatest('*', watchAaync);
}
