// Use Web Crypto API to compute SHA-256 hex digest of the password.
// This avoids Node `crypto` usage in the browser and does not require
// heavy bcrypt computations client-side. The backend should apply BCrypt
// on this client-side hash before storing/comparing.

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
