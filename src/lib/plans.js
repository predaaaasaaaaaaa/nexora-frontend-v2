// Single source of truth for Paddle price IDs.
//
// These were duplicated across pricing/page.jsx and UpgradePrompt.jsx,
// which is the kind of drift that causes "checkout opened the wrong
// plan" incidents the day someone changes a price in Paddle.
//
// Override per-environment by setting NEXT_PUBLIC_PADDLE_PRO_PRICE_ID /
// NEXT_PUBLIC_PADDLE_MAX_PRICE_ID — useful when wiring sandbox vs
// production checkouts.

export const PADDLE_PRICE_IDS = {
  pro: process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID || 'pri_01kms1rwnahqaft4frraz3g7xq',
  max: process.env.NEXT_PUBLIC_PADDLE_MAX_PRICE_ID || 'pri_01kms1p5vvzgq94pgdz453p0wn',
}
