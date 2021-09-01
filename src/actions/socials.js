export const loadSocials = () => dispatch => {
  dispatch({ type: "LOADING_SOCIALS", payload: []});
  let data ={
    request : "GET_SOCIALS"
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
            dispatch({ type: "LOADED_SOCIALS_LIST", payload: respBody});
          })
    } catch (error) {
      console.log('Error '+error);
    }
}
