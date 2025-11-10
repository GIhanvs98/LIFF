# LIFF Restaurant Menu

A mobile-first restaurant menu web app built with React, Vite, and TailwindCSS, integrated with LINE LIFF for login and in-chat order confirmations.

## Features

- LINE login and profile fetch via `@line/liff`
- Personalized welcome banner using the user's display name and picture
- Category-filtered restaurant menu (Drinks, Main Dishes, Desserts)
- Cart management with quantity controls and real-time totals
- Order confirmation dialog with optional backend submission
- Sends order summary back to the user via `liff.sendMessages()`
- TailwindCSS styling with responsive layout
- Optional Express mock backend (`GET /menu`, `POST /order`)

## Folder Structure

```
liff-restaurant-menu/
├── index.html
├── package.json
├── postcss.config.cjs
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── env.example
├── public/
│   └── favicon.svg
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── data/
│   │   └── menu.ts
│   ├── lib/
│   │   └── liff.ts
│   ├── context/
│   │   └── CartContext.tsx
│   ├── components/
│   │   ├── Banner.tsx
│   │   ├── Cart.tsx
│   │   ├── CategoryTabs.tsx
│   │   ├── Menu.tsx
│   │   └── OrderDialog.tsx
│   └── types/
│       └── index.ts
└── server/
    ├── package.json
    └── server.js
```

## Getting Started

### Frontend

```bash
cd liff-restaurant-menu
npm install
```

1. Duplicate `env.example` → `.env` (or `.env.local`) and fill in:

   ```dotenv
   VITE_LIFF_ID=YOUR_LIFF_ID
   VITE_API_BASE_URL=http://localhost:4000
   ```

   - `VITE_LIFF_ID` comes from your LINE Developers console.
   - `VITE_API_BASE_URL` is optional; omit or clear if you do not run the backend.

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the provided URL in the LIFF browser or use the LIFF simulator.

### Backend (optional)

```bash
cd liff-restaurant-menu/server
npm install
npm run dev
```

The server exposes:

- `GET /menu` → returns menu items
- `POST /order` → logs the order and returns confirmation

Update `VITE_API_BASE_URL` to `http://localhost:4000` (default) to wire in the frontend.

## LIFF Initialization

`src/lib/liff.ts` implements the required initialization logic:

```startLine:endLine:src/lib/liff.ts
export async function initLiff(): Promise<LiffProfile | null> {
  const liffId = import.meta.env.VITE_LIFF_ID;

  if (!liffId) {
    console.warn('VITE_LIFF_ID is not set. Running in fallback mode.');
    return null;
  }

  await liff.init({ liffId });
  if (!liff.isLoggedIn()) {
    liff.login();
    return null;
  }
  const profile = await liff.getProfile();
  return {
    userId: profile.userId,
    displayName: profile.displayName,
    pictureUrl: profile.pictureUrl ?? undefined,
    statusMessage: profile.statusMessage ?? undefined
  };
}
```

Additional helpers handle logout, message sending, and client detection.

## Order Flow

1. User taps “Place Order”.
2. Confirmation dialog displays current cart summary.
3. On confirm:
   - Optional `POST /order` request.
   - Sends LINE message via `liff.sendMessages()`.
   - Clears the cart and notifies the user.

## Deploying on Vercel

1. Push the project to a Git repository (GitHub/GitLab/Bitbucket).
2. Create a new Vercel project and import the repository.
3. Configure environment variables in Vercel:
   - `VITE_LIFF_ID`
   - `VITE_API_BASE_URL` (optional, e.g., production API or mock server URL)
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

For the backend mock server, either deploy separately (e.g., Railway, Render, or Vercel serverless function) or replace with a production API.

## Testing Checklist

- [ ] LIFF login works and profile data renders.
- [ ] Menu displays and filters by category.
- [ ] Items add/remove correctly; totals update.
- [ ] Place order dialog shows summary.
- [ ] `liff.sendMessages()` sends confirmation.
- [ ] Optional backend receives menu and order requests.

## License

MIT © 2025

# LIFF
