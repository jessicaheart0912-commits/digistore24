// Shared helpers for the Netlify Functions (Node 18+).
import crypto from 'node:crypto';
import { getStore } from '@netlify/blobs';

export const users = () => getStore('students'); // key = lower-case email

export const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

// Digistore24 signature (IPN + signed thank-you URL): sort keys, skip sha_sign and empty
// values, concat "key=value" + passphrase, SHA-512, upper-case.
export function ds24Sign(params, passphrase) {
  const keys = Object.keys(params).filter((k) => k !== 'sha_sign' && k !== 'SHA_SIGN').sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  let s = '';
  for (const k of keys) { const v = params[k]; if (v !== undefined && v !== null && String(v) !== '') s += `${k}=${v}${passphrase}`; }
  return crypto.createHash('sha512').update(s, 'utf8').digest('hex').toUpperCase();
}
export const ds24Valid = (params, passphrase) =>
  !!passphrase && !!params.sha_sign && ds24Sign(params, passphrase) === String(params.sha_sign).toUpperCase();

// Passwords
export function hashPw(pw, salt = crypto.randomBytes(16).toString('hex')) {
  return { salt, hash: crypto.scryptSync(pw, salt, 64).toString('hex') };
}
export const checkPw = (pw, u) => u && u.hash && crypto.timingSafeEqual(Buffer.from(hashPw(pw, u.salt).hash, 'hex'), Buffer.from(u.hash, 'hex'));

// Session token: base64(email|exp).hmac
const SECRET = () => process.env.SESSION_SECRET || '';
export function makeToken(email, days = 30) {
  const body = Buffer.from(`${email}|${Date.now() + days * 864e5}`).toString('base64url');
  return `${body}.${crypto.createHmac('sha256', SECRET()).update(body).digest('base64url')}`;
}
export async function readToken(req) {
  const t = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const [body, sig] = t.split('.');
  if (!body || !sig || !SECRET()) return null;
  const good = crypto.createHmac('sha256', SECRET()).update(body).digest('base64url');
  if (sig.length !== good.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good))) return null;
  const [email, exp] = Buffer.from(body, 'base64url').toString().split('|');
  if (+exp < Date.now()) return null;
  const u = await users().get(email, { type: 'json' });
  return u && u.active ? u : null; // refunded / charged-back students are blocked here
}

export async function formParams(req) {
  const ct = req.headers.get('content-type') || '';
  if (ct.includes('application/json')) return await req.json();
  const txt = await req.text();
  return Object.fromEntries(new URLSearchParams(txt));
}
