export default function(state = {}, action) {
  let new_state = {}
  switch(action.type) {
    case "SET_DEFAULT":
      return action.payload
      break
    case "CHANGE_PAGE": 
      Object.assign(new_state, state)

      new_state.prev_page = state.active_page
      new_state.active_page = action.payload.page
      new_state.open_menu = false

      if(new_state.active_page[1] == 'post' || new_state.active_page[1] == 'edit') {
        new_state.active_post = action.payload.post
      }

      return new_state
      break
    case "TOGGLE_MENU": 
      Object.assign(new_state, state)

      new_state.open_menu = action.payload
      return new_state
      break
    case "SEARCHING_POSTS":
      Object.assign(new_state, state)

      new_state.search_query = action.payload
      new_state.loading = 'search'
      return new_state
      break
    case "LOADING_POST":
      Object.assign(new_state, state)

      new_state.loading = true
      return new_state
      break
    case "LOADING_MEDIA":
      Object.assign(new_state, state)

      new_state.loading = true
      return new_state
      break
    case "LOADED_POST":
      Object.assign(new_state, state)

      new_state.loading = false
      return new_state
      break
    case "LOADED_MEDIA_LIST":
      Object.assign(new_state, state)

      new_state.loading = false
      return new_state
      break
    case "LOADED_POSTS_LIST":
      Object.assign(new_state, state)

      new_state.loading = false
      return new_state
      break
    case "CLEAR_SEARCH_QUERY":
      Object.assign(new_state, state)

      new_state.search_query = ''
      return new_state
      break
    default: 
      return state
      break
  }
}