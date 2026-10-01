// Called from thank-you.html: verifies the signed Digistore24 thank-you URL,
// creates/activates the student and sets their password (no email service needed).
import { users, ds24Valid, hashPw, makeToken, json } from './_lib.mjs';

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'POST only' });
  const { params = {}, password = '' } = await req.json();
  if (!ds24Valid(params, process.env.DS24_THANKYOU_KEY)) return json(403, { error: 'This link could not be verified. Please contact support with your order ID.' });
  const email = String(params.email || '').trim().toLowerCase();
  if (!email) return json(400, { error: 'Missing email.' });
  if (password.length < 8) return json(400, { error: 'Password must be at least 8 characters.' });
  const store = users();
  const u = (await store.get(email, { type: 'json' })) || { email, created: Date.now() };
  if (u.hash && u.active) return json(409, { error: 'Your account already exists. Please log in.' });
  Object.assign(u, hashPw(password), { active: u.lastEvent ? u.active !== false : true, order_id: params.order_id || u.order_id, updated: Date.now() });
  await store.setJSON(email, u);
  return json(200, { email, token: makeToken(email) });
};
export const config = { path: '/api/activate' };
