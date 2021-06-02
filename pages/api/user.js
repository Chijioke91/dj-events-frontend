import { API_URL } from '@/config/index';
import { parseCookie } from '@/helpers/index';

export default async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `${req.method} requests not allowed for this route` });
  }

  if (!req.headers.cookie) {
    return res.status(403).json({ message: 'Not Authorized' });
  }

  // const { token } = cookie.parse(req.headers.cookie);
  const { token } = parseCookie(req);

  const strapiResponse = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const user = await strapiResponse.json();

  if (strapiResponse.ok) {
    res.status(200).json({ user });
  } else {
    res.status(403).json({ message: 'User Forbidden' });
  }
};
