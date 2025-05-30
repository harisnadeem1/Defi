// api/mattermostRegister.js
import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const MATTERMOST_URL = 'http://45.61.137.107:8065';
const ADMIN_TOKEN = 'hfw6yztrtpnndcj78uzyzzgtdw'; // Replace with your real token
const TEAM_ID = '1k66m78rbfdw8eigi8c49htbwr';
const CHANNEL_ID = 'hewmgh3e9bgp9nrjanmhaqw1ya';

router.post('/register-mattermost', async (req, res) => {
  const { email, username } = req.body;
  const generatePassword = () => {
  return Math.random().toString(36).slice(-10) + Math.random().toString(36).toUpperCase().slice(-2);
};
const password = generatePassword();

  try {
    // 1. Create user
    const userRes = await fetch(`${MATTERMOST_URL}/api/v4/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ADMIN_TOKEN}`,
      },
      body: JSON.stringify({ email, username, password }),
    });

    const user = await userRes.json();

    if (!user.id) {
      console.error('User creation failed:', user);
      return res.status(400).json({ error: user.message || 'User creation failed' });
    }

    const userId = user.id;
    console.log(`✅ User created: ${username} (${userId})`);

    // 2. Add to team
    const teamRes = await fetch(`${MATTERMOST_URL}/api/v4/teams/${TEAM_ID}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ADMIN_TOKEN}`,
      },
      body: JSON.stringify({ team_id: TEAM_ID, user_id: userId }),
    });

    const teamJson = await teamRes.json();
    if (!teamRes.ok) {
      console.error('❌ Failed to add user to team:', teamJson);
      return res.status(500).json({ error: teamJson.message || 'Team add failed' });
    }

    console.log(`✅ User added to team: ${TEAM_ID}`);

    // 3. Add to channel
    const channelRes = await fetch(`${MATTERMOST_URL}/api/v4/channels/${CHANNEL_ID}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ADMIN_TOKEN}`,
      },
      body: JSON.stringify({ user_id: userId }),
    });

    const channelJson = await channelRes.json();
    if (!channelRes.ok) {
      console.error('❌ Failed to add user to channel:', channelJson);
      return res.status(500).json({ error: channelJson.message || 'Channel add failed' });
    }

    console.log(`✅ User added to channel: ${CHANNEL_ID}`);

    res.status(200).json({ message: 'Mattermost user registered and added to team and channel.' });
  } catch (err) {
    console.error('❌ Internal error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;
