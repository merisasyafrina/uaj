export const DOWNLOAD_TOKEN_TTL_MS = 5 * 60 * 1000; // 5 minutes

export const downloadTokens = new Map<
  string,
  { pdfUrl: string; exp: number }
>();

export function cleanupExpiredTokens() {
  const now = Date.now();
  for (const [token, { exp }] of downloadTokens.entries()) {
    if (exp < now) downloadTokens.delete(token);
  }
}
