export const setDefaultAppSettings = (data) => dispatch => {
  dispatch({ type: "SET_DEFAULT", payload: data});
}

export const changePage = (data) => dispatch => {
  dispatch({ type: "CHANGE_PAGE", payload: {page: data}});
}

export const toggleMenu = (data) => dispatch => {
  dispatch({ type: "TOGGLE_MENU", payload: data});
}

export const clearSearchQuery = () => dispatch => {
  dispatch({ type: "CLEAR_SEARCH_QUERY", payload: ''});
}