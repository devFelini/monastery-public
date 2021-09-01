export default function(state = [], action) {
  switch(action.type) {
    case "LOADING_POSTS": 
      return []      
      break;
    case "SEARCHING_POSTS":
      return []      
      break;
    case "LOADED_POSTS_LIST":
      if(action && action.payload) {
        return action.payload 
      } else {
        return state
      }
      break;
    case "LOADING_POST": 
      return state      
      break;
    case "LOADED_POST": 
      let pos = state.findIndex(post => post.id == action.payload.id)    
      let post = action.payload

      if(pos > -1) {

        if(state[pos] && state[pos].search) {
          post.search = state[pos].search
        }

        state[pos] = post
      } else {
        state.push(post)
      }

      return state  
      break;
    default:
      return state
      break;
  }
}