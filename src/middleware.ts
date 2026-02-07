import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Only locale routes; skip _next, api, and static files (.*\.)
  matcher: ['/((?!_next|_vercel|api|.*\\.).*)'],
};
