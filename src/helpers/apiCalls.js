fetchApi = async (url) => {
    try {
        const initialFetch = await fetch(url);
        if(initialFetch.status <= 200) {
            return await initialFetch.json();
        } else {
            throw new Error('Bad staus code!')
        }
    } catch (error) {
        throw new Error(`Error retrieving Movies: ${error}`);
    }
}

export default fetchApi;