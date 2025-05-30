export async function registerMattermostUser({ email, username, password }) {

 



  const MATTERMOST_BASE_URL = import.meta.env.VITE_MATTERMOST_BASE_URL;
const MATTERMOST_ADMIN_TOKEN = import.meta.env.VITE_MATTERMOST_ADMIN_TOKEN;
const TEAM_ID = import.meta.env.VITE_MATTERMOST_TEAM_ID;
const CHANNEL_ID = import.meta.env.VITE_MATTERMOST_CHANNEL_ID;


  // 1. Create Mattermost User
  const userRes = await fetch(`${MATTERMOST_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MATTERMOST_ADMIN_TOKEN}`, // REPLACE THIS
    },
    body: JSON.stringify({
      email,
      username,
      password,
    }),
  });

  const user = await userRes.json();
  if (!userRes.ok) throw new Error(user.message || "Failed to create user");

  // 2. Add to Team
  const teamRes = await fetch(`${MATTERMOST_BASE_URL}/teams/${TEAM_ID}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MATTERMOST_ADMIN_TOKEN}`,
    },
    body: JSON.stringify({
      team_id: TEAM_ID,
      user_id: user.id,
    }),
  });

  if (!teamRes.ok) {
    const err = await teamRes.json();
    throw new Error(err.message || "Failed to add to team");
  }

  // 3. Add to Channel
  const channelRes = await fetch(`${MATTERMOST_BASE_URL}/channels/${CHANNEL_ID}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MATTERMOST_ADMIN_TOKEN}`,
    },
    body: JSON.stringify({
      channel_id: CHANNEL_ID,
      user_id: user.id,
    }),
  });

  if (!channelRes.ok) {
    const err = await channelRes.json();
    throw new Error(err.message || "Failed to add to channel");
  }

  // 4. Login to get token
  const loginRes = await fetch(`${MATTERMOST_BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login_id: email,
      password,
    }),
  });

  const tokenData = await loginRes.json();
  if (!loginRes.ok) throw new Error(tokenData.message || "Login failed");

  const token = loginRes.headers.get("token") || loginRes.headers.get("Token") || loginRes.headers.get("Authorization");
const cookie = loginRes.headers.get("set-cookie");
  console.log(user.id,token,cookie);
  for (let [key, value] of loginRes.headers.entries()) {
  console.log(`${key}: ${value}`);
  
}




 const patRes = await fetch(`${MATTERMOST_BASE_URL}/users/${user.id}/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MATTERMOST_ADMIN_TOKEN}`,
      },
      body: JSON.stringify({
        description: `Token for ${user.username}`,
      }),
    });

    const pat = await patRes.json();
    if (!pat.token) throw new Error("PAT creation failed");
    console.log(pat.token )

  return {
    mattermost_user_id: user.id,
    mattermost_token: pat.token,
  };
}
