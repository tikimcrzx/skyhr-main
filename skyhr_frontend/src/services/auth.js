import axios from "axios"
const jwtDecode = require('jwt-decode')

export const login = async (data) => {
  let res = await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/user/signin/`,
    data
  ).then(response => {
    return response
  }).catch(error => {
    return {status: error.response.status}
  })

  return res
}

export const register = async (data) => {
  let res = await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/user/signup/`,
    data
  ).then(response => {
    return response
  }).catch(error => {
    return {status: error.response.status, data: 'Please confirm your email.'}
  })

  return res
}

export const googleLogin = async (accesstoken) => {
  let res = await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/user/google-login/`,
    {
      token: accesstoken
    }
  )

  return res
}

export const facebookLogin = async (accessToken, id, email) => {
  let res = await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/user/facebook-login/`,
    {
      userID: id,
      accessToken: accessToken,
      email: email
    }
  )

  return res
}

export const linkedInLogin = async (code) => {
  let res = await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/user/linkedin-login/`,
    {
      code: code
    }
  )

  return res
}

export const isAuthenticated = () => {
  const token = localStorage.getItem('access')
  if (!token)
    return false

  const access = jwtDecode(token)
  if (access && access.exp) {
    return access.exp - (new Date()).getTime() < 3600*24
  } else if (typeof token === "undefined") {
    return false
  }

  return true
}
