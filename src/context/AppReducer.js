export default (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        name: action.payload.username,
        token: action.payload.token
      }
    default:
      return state;
  }
}