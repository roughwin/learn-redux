const reducer = (state={}, action) => {
  switch (action.type) {
    default:
      console.log(action)
      return {
        a: 'abc'
      }
  }
}

export default reducer;
