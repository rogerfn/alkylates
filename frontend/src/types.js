/*
AUTH TYPES
*/

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const USER_LOADED_SUCCESS = "LOGGED_USER_SUCCESS";
export const USER_LOADED_FAIL = "LOGGED_USER_FAIL";
export const AUTHENTICATED_SUCCESS = "AUTHENTICATED_SUCCESS";
export const AUTHENTICATED_FAIL = "AUTHENTICATED_FAIL";
export const LOGOUT = "LOGOUT";

export const API_HOST = () => {
    if (process.env.REACT_APP_MODE === "production") {
        return "https://alkylates-test-api.chemicals-digital.sasol.com";
    } else if (process.env.REACT_APP_MODE === 'testing') {
        return "https://alkylates-test-api.chemicals-digital.sasol.com";
    } else {
        return "https://alkylates-test-api.chemicals-digital.sasol.com";
    }
};

export const HEADERS = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",

    },
}

