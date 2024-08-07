import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const refreshToken = async (token: JWT): Promise<JWT> => {
  const res = await fetch("http://localhost:3000", {
    method: "POST",
    headers: {
      authorization: "Refresh " + token.backendTokens.refreshTokens,
    },
  });

  const response = await res.json();

  return { ...token, backendTokens: response };
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johnode@gmail.com",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as Record<any, any>;

        //  todo: move backend url to env.
        const response = await fetch("http://localhost:3005/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status == 401) {
          console.log({ text: response.statusText });
          return null;
        }
        const user = await response.json();

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log({ token, user });
      if (user) return { ...token, user };

      // refresh token when current time is greater than expiresAt
      if (Date.now() < token.backendTokens.expiresAt) {
        return token as any;
      }

      return await refreshToken(token);
    },
    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
