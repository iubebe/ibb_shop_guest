# Guest cart: optional customer info

Date: 21-10-2026

Main doc: `ibb_shop_backend/docs/21102026/guest_customer_info.md`.

- `src/features/nav/cart-panel.tsx`: optional name / phone / address under the cart total, sent with the order. Phone is validated client-side (same rule as backend); everything else is optional.
- Inputs are local plain `<input>`s (the guest app has no Input component yet); propose extracting one if a third form appears.
- Not checked in a browser at 390px yet.
