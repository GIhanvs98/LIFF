import liff from '@line/liff';

export interface LiffProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

export async function initLiff(): Promise<LiffProfile | null> {
  const liffId = import.meta.env.VITE_LIFF_ID;

  if (!liffId) {
    console.warn('VITE_LIFF_ID is not set. Running in fallback mode.');
    return null;
  }

  try {
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
  } catch (error) {
    console.error('Failed to initialize LIFF', error);
    return null;
  }
}

export function ensureLoggedIn(): void {
  if (!liff.isLoggedIn()) {
    liff.login();
  }
}

export function logout(): void {
  if (liff.isLoggedIn()) {
    liff.logout();
    window.location.reload();
  }
}

export async function sendMessage(message: {
  type: 'text';
  text: string;
}): Promise<void> {
  if (!liff.isLoggedIn()) {
    throw new Error('Cannot send message: LIFF user not logged in.');
  }

  await liff.sendMessages([message]);
}

export function isInClient(): boolean {
  try {
    return liff.isInClient();
  } catch {
    return false;
  }
}

