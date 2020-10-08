export const loginWithJWT = data => {
  return dispatch => {
    dispatch({
      type: "LOGIN_WITH_JWT",
      payload: { data }
    })
  }
}
