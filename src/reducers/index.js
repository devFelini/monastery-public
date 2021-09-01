import {combineReducers} from "redux"
import AppReducers from "./app"
import PostsReducers from "./posts"
import MediaReducers from "./media"
import SocialsReducers from "./socials"

const allReducers = combineReducers({
  app     : AppReducers,
  posts   : PostsReducers,
  media   : MediaReducers,
  socials : SocialsReducers,
})

export default allReducers