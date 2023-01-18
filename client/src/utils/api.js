const API_URL = process.env.REACT_APP_API_URL;

const apiFetch = (path, options = {}) => {
    return fetch(`${API_URL}${path}`, options).then(response => response);
};

export default apiFetch;