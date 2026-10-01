# Jessica Business Korean: course website

Site for **jessicabusinesskorean.com**. Sales page, checkout through Digistore24, student classroom and affiliate page.

## Pages
| File | Purpose |
|---|---|
| `index.html` | Sales landing page: hero with the Welcome video, 2 free previews, curriculum, book, instructor, reviews, pricing, 60-day guarantee, countdown |
| `thank-you.html` | Page after payment. Set this as the **Thank-you URL** in Digistore24 |
| `login.html` | Student login |
| `classroom.html` | Video player for all 33 lessons, progress bar, notes, mark complete |
| `resources.html` | Downloads (PDF / DOCX) |
| `affiliates.html` | Affiliate link builder, promo images, ready-to-use copy, guidelines. **Private**: not linked on the site and `noindex`. Share it only through Digistore24 |
| `faq.html` | FAQ and refund policy |
| `terms.html` | Terms, privacy policy, imprint (template, have it reviewed) |

All settings are at the top of `assets/site.js` in `CONFIG`: price, guarantee days, checkout link, countdown length.

## Before launch: checklist
1. **Digistore24 product**
   - Create the product at $84.99.
   - Copy the order-form link into `CONFIG.checkoutUrl`.
2. **Thank-you URL** in Digistore24:
   `https://jessicabusinesskorean.com/thank-you.html?order_id=%ORDER_ID%&email=%EMAIL%`
3. **Payment → access** (real login): turn on Digistore24's **IPN / webhook**. On each `on_payment` event, your server creates a student account and emails the password. On `on_refund` or `on_chargeback`, it revokes access.
   *In this prototype, login is front-end only: any email logs in. Genspark Code can build the real back end (accounts, IPN handler, protected video URLs).*
4. **Video hosting**: we recommend **Bunny Stream**.
   - Cheap (about $0.005/GB).
   - Signed, expiring URLs, so only paying students can play the videos.
   - Fast worldwide.
   - Upload the 33 lesson files. Put each video URL in `MEDIA` in `site.js`. In production, get the URLs from the server.
   - *Alternative:* Vimeo Pro/Plus with domain-level privacy.
   - **Status:** all 33 lessons are already mapped in `site/assets/videos.js` (library `765234`). The free previews on `index.html` (lessons 1 and 6) also stream from Bunny.
   - When you turn on Token Authentication, keep lessons **1 and 6** public. The simplest way: upload copies of those two videos to a second, public Bunny library and put their IDs in `index.html`.
5. **Downloads**: upload the PDFs to `/downloads/` (or to protected storage).
6. **Reviews**: replace the 3 placeholder reviews on `index.html` after launch.
7. **Legal**: fill in the [bracketed] fields in `terms.html`.
8. **Affiliates**: in Digistore24, set the commission (the page shows 50% as a placeholder) and the cookie duration. Then update `affiliates.html`.
   - Put `https://jessicabusinesskorean.com/affiliates.html` in the product's **Affiliate support page URL** (Product → Affiliate settings), so only Digistore24 affiliates see it.
   - For stronger privacy, rename the file to something unguessable (e.g. `partners-7k2x.html`) and use that URL instead.

## How affiliate tracking works
Visitors who arrive with `?aff=ID` are sent to checkout with that ID, so Digistore24 credits the sale to that affiliate.
