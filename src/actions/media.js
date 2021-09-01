export const loadMedia = (reload = true, offset = 0) => dispatch => {
  dispatch({ type: "LOADING_MEDIA", payload: []})
  let data ={
    request : "GET_MEDIA_LIST",
    count   : 18,
    offset  : offset,
    reload  : reload,
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
            if(reload) {
              dispatch({ type: "CLEAR_MEDIA_LIST", payload: []})
            }
            dispatch({ type: "LOADED_MEDIA_LIST", payload: respBody})
          })
    } catch (error) {
      console.log('Error '+error);
    }
}
