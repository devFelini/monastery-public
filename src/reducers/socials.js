export default function(state = [], action) {
  switch(action.type) {
    case "LOADING_SOCIALS": 
      return []      
      break;
    case "LOADED_SOCIALS_LIST":
      if(action && action.payload) {
        return action.payload 
      } else {
        return state
      }
      break;
    default:
      return state
      break;
  }
}