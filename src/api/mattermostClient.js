


const MATTERMOST_BASE_URL = import.meta.env.VITE_MATTERMOST_BASE_URL;


/**
 * Make a GET request to Mattermost API using user's token
 * @param {string} endpoint - API endpoint (e.g., "/users/me")
 * @param {string} token - Mattermost user token
 */
export async function mmGet(endpoint, token) {
  const res = await fetch(`${MATTERMOST_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    console.error(`GET ${endpoint} failed:`, err);
    throw new Error(err.message || "Mattermost GET request failed");
  }

  return res.json();
}

/**
 * Make a POST request to Mattermost API using user's token
 * @param {string} endpoint - API endpoint (e.g., "/posts")
 * @param {object} body - Payload for the POST request
 * @param {string} token - Mattermost user token
 */
export async function mmPost(endpoint, body, token) {
  const res = await fetch(`${MATTERMOST_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error(`POST ${endpoint} failed:`, err);
    throw new Error(err.message || "Mattermost POST request failed");
  }

  return res.json();
}
