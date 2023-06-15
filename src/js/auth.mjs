
import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import jwt_decode from "jwt-decode";

export async function login(creds, redirect = "/") {
  try {
    const token = await loginRequest(creds);
    localStorage.setItem("so-token", JSON.stringify(token));

    // because of the default arg provided above...if no redirect is provided send them Home.
    window.location = redirect;
  } catch (error) {
    alertMessage(error.message.message);
  }
}

export function checkLogin() {
  const token = getLocalStorage("so-token");
  const isValid = isTokenValid(token);

  if (!isValid) {
    localStorage.removeItem("so-token");

    const location = window.location;

    window.location = `/login/index.html?redirect=${location.pathname}`;
  } else {
    return token;
  }
}

export function isTokenValid(token) {
  if (token) {
    const decoded = jwt_decode(token);
    const currentDate = new Date();

    if (decoded.exp * 1000 < currentDate.getTime()) {
      console.log("Token expired");
      return false;
    } else {
      console.log("Valid token");
      return true;
    }
  } else {
    return false;
  }
}