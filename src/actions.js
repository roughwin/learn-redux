
export function hello() {
  return {
    type: 'hello',
  }
}

export function hello2() {
  return async (dispatch, getState) => {
    dispatch({type: 'hello2'})
  }
}

function sleep(ms) {
  return new Promise(function(res,rej) {
    setTimeout(res, ms);
  })
}

export function helloasync() {
  return async (dispatch, getState) => {
    dispatch({type: 'hello_async1', time: new Date().getTime()})
    await sleep(5000);
    dispatch({type: 'hello_async2', time: new Date().getTime()})
  }
}