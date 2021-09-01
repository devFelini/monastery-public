export const loadPosts = () => dispatch => {
  dispatch({ type: "LOADING_POSTS", payload: []});
  let data ={
    request : "GET_POSTS_LIST",
    count   : 10
  }
  
  let formData = new FormData()
  for(let key in data) {
    formData.append(key, data[key])
  }
  
  let url = 'http://public.devkater.ru/data.php'

  try {
      fetch(url, {
        method: 'POST',
        body: formData,
      })
          .then(response => response.json())
          .then(respBody => {
            dispatch({ type: "LOADED_POSTS_LIST", payload: respBody});
          })
    } catch (error) {
      console.log('Error '+error);
    }
}

export const searchPosts = (query) => dispatch => {
  dispatch({ type: "SEARCHING_POSTS", payload: query});
  let data ={
    request : "SEARCH",
    query   : query
  }

  let formData = new FormData()
  for(let key in data) {
    formData.append(key, data[key])
  }
  
  let url = 'http://public.devkater.ru/data.php'

  try {
      fetch(url, {
        method: 'POST',
        body: formData,
      })
          .then(response => response.json())
          .then(respBody => {
            dispatch({ type: "LOADED_POSTS_LIST", payload: respBody});
          })
    } catch (error) {
      console.log('Error '+error);
    }
}

export const openPost = (page, id) => dispatch => {
  dispatch({type: "LOADING_POST", payload: id});

  let data ={
    request : "GET_POST",
    id      : id
  }
  
  let formData = new FormData()
  for(let key in data) {
    formData.append(key, data[key])
  }
  
  let url = 'http://public.devkater.ru/data.php'

  try {
    fetch(url, {
      method: 'POST',
      body: formData,
    })
        .then(response => response.json())
        .then(respBody => {
          dispatch({type: "LOADED_POST", payload: respBody[0]});
          dispatch({type: "CHANGE_PAGE",  payload: {page: [page, 'post'], post: id}});
        })
  } catch (error) {
    console.log('Error '+error);
  }
}
