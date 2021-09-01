export default function(state = [], action) {
  let new_state = {}
  switch(action.type) {
    case "CLEAR_MEDIA_LIST":
      return []
      break;
    case "LOADED_MEDIA_LIST":
      if(action && action.payload) {
        return state.concat(action.payload);
      } else {
        return state
      }
      break;
    default: 
      return state
      break
  }
}