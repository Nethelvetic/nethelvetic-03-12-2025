// Utility functions to interact with authentication API endpoints

// Types used by the sign-in helpers
export type SignInHandlers = {
  onRequest?: () => void;
  onResponse?: () => void;
};

export type EmailCredentials = {
  email: string;
  password: string;
};

export type SocialParams = {
  provider: string;
  callbackURL?: string;
};

/**
 * Send credentials to the email sign in endpoint.
 */
async function email(
  credentials: EmailCredentials,
  handlers: SignInHandlers = {}
): Promise<void> {
  handlers.onRequest?.();
  try {
    await fetch("/api/auth/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
  } finally {
    handlers.onResponse?.();
  }
}

/**
 * Redirect the user to the chosen social provider.
 */
async function social(
  { provider, callbackURL }: SocialParams,
  handlers: SignInHandlers = {}
): Promise<void> {
  handlers.onRequest?.();
  const url = new URL(`/api/auth/${provider}`, window.location.origin);
  if (callbackURL) {
    url.searchParams.set("callbackUrl", callbackURL);
  }
  window.location.href = url.toString();
  handlers.onResponse?.();
}

export const signIn = { email, social };

export default signIn;
