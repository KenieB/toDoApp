import formatAllDueDates from "./formatDueDate";

const API_BASE_URL = "http://localhost:5000";

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

    /*
     ** (logging for api debugging)
     **
     **  .then((response) => {
     **    // Inspect the headers in the response
     **    response.headers.forEach(console.log);
     **    // OR you can do this
     **    for (let entry of response.headers.entries()) {
     **      console.log(entry);
     **    }
     **    return response;
     **  })
     **  .catch((err) => console.error(err));
     */

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
    mode: "cors",
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
    mode: "cors",
    credentials: "include",
    method: "POST",
    headers,
    body: JSON.stringify({ data: userCredentials }),
    signal,
  };
  return await fetchJson(url, options, []);
}

/**
 * Clear user session authorization cookies to close user session access
 * @param {AbortController.signal<signal>}
 *  optional AbortController.signal
 * @returns {Promise<status>}
 *  a promise that resolves to the status code confirming session termination (no response body).
 */
export async function logoutUser(signal) {
  const url = new URL(`${API_BASE_URL}/users/logout`);
  const options = {
    mode: "cors",
    credentials: "include",
    method: "POST",
    headers,
    signal,
  };
  return await fetchJson(url, options, []);
}

/**
 * Retrieves existing to-do list items for user with specified `userId`
 * @param {string<userId>}
 *  the `user_id` matching desired to-do list items(s)
 * @param {AbortController.signal<signal>}
 *  optional AbortController.signal
 * @returns {Promise<[toDoList]>}
 *  a promise that resolves to a possibly empty array of to-do list items with `user_id`===`userId` saved in the database.
 */

export async function loadList(userId, signal) {
  const url = new URL(`${API_BASE_URL}/to-do/${userId}`);
  const options = {
    mode: "cors",
    credentials: "include",
    headers,
    signal,
  };
  return await fetchJson(url, options, []).then(formatAllDueDates);
}

/**
 * Add new item to to-do list for user with specified `userId`
 * @param {string<userId>}
 *  the `user_id` matching desired to-do list items(s)
 * @param {object<newItem>}
 *  the new item to add to the list for user in database
 * @param {AbortController.signal<signal>}
 *  optional AbortController.signal
 * @returns {Promise<{newItem}>}
 *  a promise that resolves to the new to-do list items for `user_id`===`userId` saved in the database.
 */

export async function addToList(userId, newItem, signal) {
  const url = new URL(`${API_BASE_URL}/to-do/${userId}`);
  const options = {
    mode: "cors",
    credentials: "include",
    method: "POST",
    headers,
    body: JSON.stringify({ data: newItem }),
    signal,
  };
  return await fetchJson(url, options, []).then(formatAllDueDates);
}

/**
 * Delete to-do list item for user with specified `userId`
 * @param {string<userId>}
 *  the `user_id` matching desired to-do list items(s)
 * @param {string<item_id>}
 *  the to-do list item id to delete from the list for user in database
 * @param {AbortController.signal<signal>}
 *  optional AbortController.signal
 * @returns {Promise<[toDoList]>}
 *  a promise that resolves to a possibly empty array of to-do list items with `user_id`===`userId` saved in the database (without now-deleted specified item).
 */

 export async function deleteListItem(userId, item_id, signal) {
  const url = new URL(`${API_BASE_URL}/to-do/${userId}`);
  const options = {
    mode: "cors",
    credentials: "include",
    method: "DELETE",
    headers,
    body: JSON.stringify({ data: item_id }),
    signal,
  };
  return await fetchJson(url, options, []).then(formatAllDueDates);
}

/**
 * Add new tag to specified existing to-do list item for user with specified `userId`
 * @param {string<userId>}
 *  the `user_id` matching desired to-do list items(s)
 * @param {object<newTagForItm>}
 *  the new tag and item id to update the to-do list item for user in database
 * @param {AbortController.signal<signal>}
 *  optional AbortController.signal
 * @returns {Promise<{updateItem}>}
 *  a promise that resolves to the updated to-do list items for `user_id`===`userId` saved in the database.
 */

 export async function addNewTag(userId, newTagForItm, signal) {
  const url = new URL(`${API_BASE_URL}/to-do/${userId}/tags`);
  const options = {
    mode: "cors",
    credentials: "include",
    method: "POST",
    headers,
    body: JSON.stringify({ data: newTagForItm }),
    signal,
  };
  return await fetchJson(url, options, []).then(formatAllDueDates);
}