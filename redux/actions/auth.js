import Router from "next/router";
import cookie from "js-cookie";
import {
	AUTHENTICATE,
	DEAUTHENTICATE,
	AUTHENTICATE_FAIL,
} from "../actionTypes";
import axios from "../../axios";
import logout from "../../pages/logout";

export const authenticate = (user) => (dispatch) =>
	fetch(`http://localhost:3001/auth/login`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((data) => data.json())
		.then((response) => {
			if (response.code === 200) {
				setCookie("token", response.token);

        setTimeout(() => {
          dispatch(deauthenticate());
        }, (60 * 1000))

				Router.push("/");
				dispatch({ type: AUTHENTICATE, payload: response.token });
			} else {
				dispatch({ type: AUTHENTICATE_FAIL, payload: response.error });
			}
		})
		.catch((err) => {
			console.log("Auth error: " + err);
		});

// gets the token from the cookie and saves it in the store
export const reauthenticate = (token) => {
  console.log("Reauthing..." + token);
  

	return (dispatch) => {
		dispatch({ type: AUTHENTICATE, payload: token });
	};
};

// removing the token
export const deauthenticate = () => {
	return (dispatch) => {
		removeCookie("token");

		dispatch({ type: DEAUTHENTICATE });
	};
};

export const checkServerSideCookie = async (ctx) => {
	const token = getCookie("token", ctx.req);


	if (token) {
  

		const sessionResponse = await axios.post("/auth/verify", {
			token: token,
    });
    
		const { session_valid } = sessionResponse.data;

		console.log("Valid session = ", session_valid);

		if (session_valid == true) {
      ctx.store.dispatch(reauthenticate(token));
		} else {
			ctx.store.dispatch(deauthenticate());
		}
	}
};
/**
 * cookie helper methods
 */

export const setCookie = (key, value) => {
	if (process.browser) {
		cookie.set(key, value, {
			expires: 1,
			path: "/",
		});
	}
};

export const removeCookie = (key) => {
	if (process.browser) {
		cookie.remove(key, {
			expires: 1,
		});
	}
};

export const getCookie = (key, req) => {
	return process.browser
		? getCookieFromBrowser(key)
		: getCookieFromServer(key, req);
};

export const getCookieFromBrowser = (key) => {
	return cookie.get(key);
};

export const getCookieFromServer = (key, req) => {
	if (!req.headers.cookie) {
		return undefined;
	}
	const rawCookie = req.headers.cookie
		.split(";")
		.find((c) => c.trim().startsWith(`${key}=`));
	if (!rawCookie) {
		return undefined;
	}
	return rawCookie.split("=")[1];
};
