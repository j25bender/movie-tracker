const fetchApi = async url => {
  try {
    const initialFetch = await fetch(url);
    if (initialFetch.status <= 200) {
      return await initialFetch.json();
    } else {
      throw new Error('Bad staus code!');
    }
  } catch (error) {
    const error = new Error('fetchApi failed to fetch data');
    return error;
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
    const error = new Error('fetchUser failed to fetch data');
    return error;
  }
};

export { fetchApi, fetchBackend };
