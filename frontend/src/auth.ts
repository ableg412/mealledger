// Temporary hardcoded auth for the demo milestone.
// Replace with real auth (Postgres + sessions) in the next milestone.

const DEMO_USERNAME = 'josh';
const DEMO_PASSWORD = '1234';
const STORAGE_KEY = 'mealledger.session';

export interface Session {
  username: string;
  loggedInAt: string;
}

export function login(username: string, password: string): Session | null {
  if (username.trim().toLowerCase() === DEMO_USERNAME && password === DEMO_PASSWORD) {
    const session: Session = {
      username: DEMO_USERNAME,
      loggedInAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session;
  }
  return null;
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}
