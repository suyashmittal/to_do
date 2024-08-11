const apiReq = async (url = '', options = null, errmsg = null) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw Error('Reload the App!');
    }
    catch (err) {
        errmsg = err.message;
    }
    finally {
        return errmsg;
    }
}

export default apiReq