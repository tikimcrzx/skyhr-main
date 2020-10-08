import { combineReducers } from "redux"
import auth from "./auth"
import user from "./user"

const index = combineReducers({
  auth: auth,
  user: user,
})

export default index
