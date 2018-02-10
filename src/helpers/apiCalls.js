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
      throw new Error('Bad status code!');
    }
  } catch (error) {
    throw new Error(`fetchUser failed to fetch data: ${error}`);
  }
};

const postBackend = async (url, body) => {
  try {
    const initialFetch = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json'
            }
          })
    if (initialFetch.status <= 200) {
      return await initialFetch.json();
    } else {
      throw new Error('Bad status code!');
    }
  } catch (error) {
    throw new Error(`postBackend failed to post to backend: ${error}`);
  }
}

export { fetchApi, fetchBackend, postBackend };
