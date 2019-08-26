import { createAction } from 'redux-actions';

export const hello = createAction('HELLO_ACTION')

export const helloasync = createAction('helloasync', async payload => {
  console.log(payload);
  return payload;
})

export const aaa = createAction('aaa');

export const abc = (dspatch) => {
  return { type: 'abdedfg '};
}

console.log(helloasync)


