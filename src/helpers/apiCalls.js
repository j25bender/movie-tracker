const fetchApi = async url => {
  try {
    const initialFetch = await fetch(url);
    if (initialFetch.status <= 200) {
      return await initialFetch.json();
    } else {
      throw new Error('Bad staus code!');
    }
  } catch (error) {
    const errorApi = new Error(`fetchApi failed to fetch data: ${error}`);
    return errorApi;
  }
};

const fetchBackend = async url => {
  try {
    const initialFetch = await fetch(url);
    if (initialFetch.status <= 200) {
      return await initialFetch.json();
    } else {
      throw new Error('Bad staus code!');
    }
  } catch (error) {
    const errorBackend = new Error(`fetchUser failed to fetch data: ${error}`);
    return errorBackend;
  }
}

export {
  fetchApi,
  fetchBackend
};
