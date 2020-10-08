const initialState = {
  access: undefined,
  refresh: undefined,
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_WITH_JWT":
      localStorage.setItem('access', action.payload.data.access)
      localStorage.setItem('refresh', action.payload.data.refresh)

      return {
        ...state,
        access: action.payload.data.access,
        refresh: action.payload.data.refresh,
      }
    case "LOGOUT_WITH_JWT":
      localStorage.clear()
      return {
        ...state,
        access: undefined,
        refresh: undefined,
      }
    default:
      return state
  }
}

export default auth;
