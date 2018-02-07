const fetchApi = async (url) => {
    try {
        const initialFetch = fetch(url);
        if(initialFetch.status <= 200) {
            const initialJson = initialFetch.json();
            return dispatchEvent(initialJson)
        } else {
            throw new Error('Bad staus code!')
        }
    } catch (error) {
        throw new Error(`Error retrieving Movies: ${error}`);
    }
}

export default fetchApi;