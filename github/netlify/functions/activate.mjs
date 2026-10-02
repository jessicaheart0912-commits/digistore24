// Called from thank-you.html to create the student's account.
// Mode A (secure): DS24_THANKYOU_KEY is set → the Digistore24 sha_sign must be valid.
// Mode B (fallback, no key): needs order_id + email from the Digistore24 thank-you URL,
//   and each order_id can only create ONE account.
import { users, ds24Valid, hashPw, makeToken, json } from './_lib.mjs';
import { getStore } from '@netlify/blobs';

export default async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'POST only' });
  const { params = {}, password = '' } = await req.json();
  const key = process.env.DS24_THANKYOU_KEY;
   const email = String(params.buyer_email || params.address_email || params.email || '').trim().toLowerCase();
  const orderId = String(params.order_id || '').trim();
  if (key) {
    if (!ds24Valid(params, key)) return json(403, { error: 'This link could not be verified. Please contact support with your order ID.' });
  } else if (!orderId || orderId.startsWith('%') || !/^[A-Za-z0-9-]{5,}$/.test(orderId)) {
    return json(403, { error: 'Missing order information. Please open the link from your Digistore24 confirmation email, or contact support with your order ID.' });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json(400, { error: 'Missing email. Please contact support with your order ID.' });
  if (password.length < 8) return json(400, { error: 'Password must be at least 8 characters.' });

  const orders = getStore('orders');
  const owner = await orders.get(orderId);
  if (owner && owner !== email) return json(409, { error: 'This order is already linked to another account.' });

  const store = users();
  const u = (await store.get(email, { type: 'json' })) || { email, created: Date.now() };
  if (u.hash && u.active) return json(409, { error: 'Your account already exists. Please log in.' });
  Object.assign(u, hashPw(password), { active: u.lastEvent ? u.active !== false : true, order_id: orderId || u.order_id, updated: Date.now() });
  await store.setJSON(email, u);
  if (orderId) await orders.set(orderId, email);
  return json(200, { email, token: makeToken(email) });
};
export const config = { path: '/api/activate' };
