const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);
    if (response.status === 204) {
      return null;
    }
    const payload = await response.json();
    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Saves new user to database
 * @param {object<newUser>}
 *  the object containing new user data
 * @param {AbortController.signal<signal>}
 *  optional AbortController.signal
 * @returns {Promise<user_id>}
 *  a promise that resolves to the user_id of the newly created user.
 */

export async function registerNewUser(newUser, signal) {
  const url = new URL(`${API_BASE_URL}/users/register`);
  const options = {
    credentials: "include",
    method: "POST",
    headers,
    body: JSON.stringify({ data: newUser }),
    signal,
  };
  return await fetchJson(url, options, []);
}

/**
 * Validate credentials for specified user 
 * @param {object<userCredentials>}
 *  the object containing user credentials
 * @param {AbortController.signal<signal>}
 *  optional AbortController.signal
 * @returns {Promise<user_id>}
 *  a promise that resolves to the user_id of the validated existing user.
 */

export async function loginUser(userCredentials, signal) {
  const url = new URL(`${API_BASE_URL}/users/login`);
  const options = {
    credentials: "include",
    method: "POST",
    headers,
    body: JSON.stringify({ data: userCredentials }),
    signal,
  };
  return await fetchJson(url, options, []);
}

/**
 * Retrieves existing to-do list for user with specified `userId`
 * @param {string<userId>}
 *  the `user_id` matching desired to-do list items(s)
 * @param {AbortController.signal<signal>}
 *  optional AbortController.signal
 * @returns {Promise<[toDoList]>}
 *  a promise that resolves to a possibly empty array of to-do list items with `user_id`===`userId` saved in the database.
 */

export async function loadList(userId, signal) {
  const url = new URL(`${API_BASE_URL}/to-do`);
  const options = {
    credentials: "include",
    headers,
    signal,
  };
  return await fetchJson(url, options, []);
}
