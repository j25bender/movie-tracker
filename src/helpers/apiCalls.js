const fetchApi = async url => {
  try {
    const initialFetch = await fetch(url);
    if (initialFetch.status <= 200) {
      return await initialFetch.json();
    } else {
      throw new Error('Bad staus code!');
    }
  } catch (error) {

    throw new Error(`fetchApi failed to fetch data: ${error}`);
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
    throw new Error(`fetchUser failed to fetch data: ${error}`);
  }
};

export { fetchApi, fetchBackend };
