import axios from 'axios'
import history from "../../../history"

export const getUserProfile = () => {
  return dispatch => {
    axios.get(
      `${process.env.REACT_APP_BACKEND_API}/user/profile/`,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("access")
        }
      }
    ).then(response => {
      const data = response.data

      dispatch({
        type: "GET_USER_PROFILE",
        payload: {data}
      })
    }).catch(error => {
      if (error.response && error.response.status === 401)
        dispatch({
          type: "LOGOUT_WITH_JWT",
        })
      history.push('/')
    })
  }
}

export const getEmployments = () => {
  return dispatch => {
    axios.get(
      `${process.env.REACT_APP_BACKEND_API}/user/employment/`,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("access")
        }
      }
    ).then(response => {
      const data = response.data
      dispatch({
        type: "GET_EMPLOYMENTS",
        payload: {data}
      })
    }).catch(error => {
      if (error.response.status === 401)
        dispatch({
          type: "LOGOUT_WITH_JWT",
        })
    })
  }
}

export const setEmployment = (employment) => {
  return dispatch => {
    dispatch({
      type: "SET_EMPLOYMENT",
      payload: employment
    })
  }
}

export const updateEmployment = (employment) => {
  return dispatch => {
    dispatch({
      type: "UPDATE_EMPLOYMENT",
      payload: employment
    })
  }
}

export const deleteEmployment = (id) => {
  return dispatch => {
    dispatch({
      type: "DELETE_EMPLOYMENT",
      payload: id
    })
  }
}

export const logOut = () => {
  return dispatch => {
    dispatch({
      type: "LOGOUT_WITH_JWT",
    })
  }
}
