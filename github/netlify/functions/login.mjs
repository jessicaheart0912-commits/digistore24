import { users, checkPw, makeToken, json } from './_lib.mjs';

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'POST only' });
  const { email = '', password = '' } = await req.json();
  const key = email.trim().toLowerCase();
  const u = await users().get(key, { type: 'json' });
  if (!u || !checkPw(password, u)) return json(401, { error: 'Email or password is incorrect.' });
  if (!u.active) return json(403, { error: 'Your access is not active (refund or payment issue). Please contact support.' });
  return json(200, { email: key, token: makeToken(key) });
};
export const config = { path: '/api/login' };
