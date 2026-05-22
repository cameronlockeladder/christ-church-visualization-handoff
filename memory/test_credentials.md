# Board Access Credentials

The static site is gated by a session-only access code.

| Field           | Value                                                           |
| --------------- | --------------------------------------------------------------- |
| Access code     | `501` (the church street number)                                |
| Where           | The full-screen gate on first visit                             |
| Persistence     | `sessionStorage` — re-prompts when the browser tab is closed    |
| To rotate       | Change the `ACCESS_CODE` constant near the top of `app.js`      |

This is intentionally lightweight client-side gating — enough to keep the
site off public search engines and from being shared casually with the
congregation before the board has reviewed it. For stronger access
control, deploy behind a Vercel password-protected preview or behind your
own auth provider.
