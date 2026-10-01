// Digistore24 IPN endpoint → https://jessicabusinesskorean.com/api/ds24-ipn
// Digistore24: Settings → Integrations (IPN) → Generic → URL above, passphrase = DS24_IPN_PASSPHRASE
import { users, ds24Valid, formParams } from './_lib.mjs';

export default async (req) => {
  const p = await formParams(req);
  if (!ds24Valid(p, process.env.DS24_IPN_PASSPHRASE)) return new Response('ERROR: invalid sha_sign', { status: 403 });
  const ev = p.event;
  if (ev === 'connection_test') return new Response('OK');
  const email = String(p.email || p.buyer_email || '').trim().toLowerCase();
  if (!email) return new Response('OK');
  const store = users();
  const u = (await store.get(email, { type: 'json' })) || { email, created: Date.now() };
  u.name = [p.address_first_name, p.address_last_name].filter(Boolean).join(' ') || u.name || '';
  u.order_id = p.order_id || u.order_id;
  if (ev === 'on_payment' || ev === 'on_rebill_resumed') u.active = true;
  if (['on_refund', 'on_chargeback', 'on_payment_missed', 'on_rebill_cancelled'].includes(ev)) u.active = false;
  u.lastEvent = ev; u.updated = Date.now();
  await store.setJSON(email, u);
  return new Response('OK'); // Digistore24 expects "OK"
};
export const config = { path: '/api/ds24-ipn' };
