const fetchApi = async url => {
  //try {
      //if (initialFetch.status <= 200) {
    return async dispatch => {
        const initialFetch = await fetch(url);
        console.log(initialFetch)
        const initialJson = await initialFetch.json();
        dispatch(initialJson);
      //};
    } 
    
//     else {
//       throw new Error('Bad staus code!');
//     }
//   } catch (error) {
//     throw new Error(`Error retrieving Movies: ${error}`);
  //}
};

export default fetchApi;
