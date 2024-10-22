// Add optional Middleware to keep the session alive, this will update the session expiry every time its called.
// Currently middleware.ts is buggy with next-auth beta v5 and Prima Edge runtime

export { auth as middleware } from '@/auth';
