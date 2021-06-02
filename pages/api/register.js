import { API_URL } from '@/config/index';
import cookie from 'cookie';

export default async (req, res) => {
  const { username, email, password } = req.body;

  console.log(username, email, password);

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `${req.method} requests not allowed for this route` });
  }

  const strapiResponse = await fetch(`${API_URL}/auth/local/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await strapiResponse.json();

  if (strapiResponse.ok) {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', data.jwt, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        path: '/',
      })
    );

    res.status(200).json({ user: data.user });
  } else {
    res.status(data.statusCode).json({ message: data.message[0].messages[0].message });
  }
};
