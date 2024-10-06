import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import { Lucia, User, Session } from 'lucia';
import db from './db';
import { cookies } from 'next/headers';

const adapter = new BetterSqlite3Adapter(db, {
  user: 'users', // This is a table name. You have created this in db.ts file
  session: 'sessions', // This is a table name. You have created this in db.ts file
});
const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production', // Will have session cookie only if the connection is HTTPS
    },
  },
});

export const createAuthSession = async (userId: string) => {
  // A user who will login this function will create a session and will update the Database
  const session = await lucia.createSession(userId, {});

  // Now it will create a session cookie with the session id from from the DB that has been created in the previosh step
  // and will add it to the user's browser cookie whoever logs in
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

export const verifyAuth = async (): Promise<
  | {
      user: User;
      session: Session;
    }
  | {
      user: null;
      session: null;
    }
> => {
  // Get the session cookie from the browser
  const sessionCookie = cookies().get(lucia.sessionCookieName);

  // sessionCookie if the user logs in first time
  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  // Get the session id from the session cookie key-value pair
  const sessionId = sessionCookie.value;

  // If the session id is not present then return null
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  // Check if the session is valid or not
  const result = await lucia.validateSession(sessionId);

  // Now NextJS will actually throw an error if you try to set a cookie if you are doing that as part of the page rendering process
  // and therefore you should wrap this with try to catch that error and then do nothing because it's actually an error we wanna ignore
  // because we want to be able to set that authentication session cookie even if we're just rendering a page.
  try {
    // If the session is fresh then still create a new session cookie
    if (result.session && result.session.fresh) {
      // This pice of code is also present in he above function createAuthSession
      const newSessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        newSessionCookie.name,
        newSessionCookie.value,
        newSessionCookie.attributes,
      );
    } else if (!result.session) {
      // If the session is not valid then remove the session cookie from the browser and make everything blank
      const newBlankSessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        newBlankSessionCookie.name,
        newBlankSessionCookie.value,
        newBlankSessionCookie.attributes,
      );
    }
    // eslint-disable-next-line no-empty
  } catch {}

  return result;
};

export const destroySession = async () => {
  const { session } = await verifyAuth();

  if (!session) {
    throw new Error('No session found. You are unauthorized');
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};
