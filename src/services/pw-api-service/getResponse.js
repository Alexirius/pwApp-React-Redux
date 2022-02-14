
const getResponse = async (url, init) => {

    const _baseUrl = process.env.REACT_APP_BASE_URL;
    console.log(`${_baseUrl}${url}`);

    const res = await fetch(`${_baseUrl}${url}`, init);

    if (!res.ok) {
        const errText = await res.text();
        let error = new Error(`${res.status}: ${errText}`);
        error.status = res.status;
        error.text = errText;
        throw error;
    }
    return res;
}

export default getResponse;