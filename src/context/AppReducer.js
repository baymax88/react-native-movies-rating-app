export default (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userName: action.payload.username,
        userToken: action.payload.token
      }
    case "ERROR":
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}