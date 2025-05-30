export async function registerMattermostUser({ email, username, password }) {

  const baseUrl = "http://45.61.137.107:8065/api/v4";
  const teamId = "1k66m78rbfdw8eigi8c49htbwr"; // replace with your team ID
  const channelId = "hewmgh3e9bgp9nrjanmhaqw1ya"; // replace with your channel ID

  // 1. Create Mattermost User
  const userRes = await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer hfw6yztrtpnndcj78uzyzzgtdw", // REPLACE THIS
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
  const teamRes = await fetch(`${baseUrl}/teams/${teamId}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer hfw6yztrtpnndcj78uzyzzgtdw",
    },
    body: JSON.stringify({
      team_id: teamId,
      user_id: user.id,
    }),
  });

  if (!teamRes.ok) {
    const err = await teamRes.json();
    throw new Error(err.message || "Failed to add to team");
  }

  // 3. Add to Channel
  const channelRes = await fetch(`${baseUrl}/channels/${channelId}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer hfw6yztrtpnndcj78uzyzzgtdw",
    },
    body: JSON.stringify({
      channel_id: channelId,
      user_id: user.id,
    }),
  });

  if (!channelRes.ok) {
    const err = await channelRes.json();
    throw new Error(err.message || "Failed to add to channel");
  }

  // 4. Login to get token
  const loginRes = await fetch(`${baseUrl}/users/login`, {
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




 const patRes = await fetch(`${baseUrl}/users/${user.id}/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer hfw6yztrtpnndcj78uzyzzgtdw`,
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
