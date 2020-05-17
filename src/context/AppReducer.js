export default (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        name: action.payload.username,
        token: action.payload.token
      }
    case "SET_NAME":
      return {
        ...state,
        name: action.payload
      }
    case "DELETE":
      return {
        ...state,
        name: '',
        token: ''
      }
    default:
      return state;
  }
}