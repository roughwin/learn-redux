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