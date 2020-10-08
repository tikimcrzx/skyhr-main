
const initialState = {
  user: {},
  employments: [],
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_PROFILE":
      return {
        ...state,
        user: {
          first_name: action.payload.data.first_name,
          last_name: action.payload.data.last_name,
          mid_name: action.payload.data.mid_name,
          email: action.payload.data.email,
          mobile: action.payload.data.mobile,
          rfc: action.payload.data.rfc,
          curp: action.payload.data.curp,
          birth: action.payload.data.birth,
          country: action.payload.data.country,
          state: action.payload.data.state,
          zipcode: action.payload.data.zipcode,
          address1: action.payload.data.address1,
          address2: action.payload.data.address2,
          linkedin_profile: action.payload.data.linkedin_profile,
          facebook_profile: action.payload.data.facebook_profile,
          twitter_profile: action.payload.data.twitter_profile,
          company_name: action.payload.data.company_name,
          is_company: action.payload.data.is_company,
          sector: action.payload.data.sector,
          photo: action.payload.data.photo,
          is_profile_completed: action.payload.data.is_profile_completed
        }
      }
    case "GET_EMPLOYMENTS":
      return {
        ...state,
        employments: action.payload.data
      }
    case "SET_EMPLOYMENT":
      return {
        ...state,
        employments: [...state.employments, action.payload],
      }
    case "DELETE_EMPLOYMENT":
      return {
        ...state,
        employments: state.employments.filter((employment, index) => employment.id !== action.payload)
      }
    case "UPDATE_EMPLOYMENT":
      const index = state.employments.findIndex(employment => employment.id === action.payload.id)
      const newEmployments = [...state.employments]
      newEmployments[index] = action.payload

      return {
        ...state,
        employments: newEmployments,
      }
    default:
      return state
  }
}

export default user;
