"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import * as React from "react";

export const SignInBtn = () => {
  const { data: session } = useSession();

  console.log({
    session,
    user: session?.user,
    token: session?.backendTokens,
  });

  if (session && session.user) {
    return (
      <>
        <div>{session.user.email}</div>
        <Link
          href="/api/auth/signout"
          className="bg-red-500 rounded-md py-2 px-4"
        >
          Sign out
        </Link>
      </>
    );
  }

  return (
    <>
      <div>{session?.user?.email}</div>
      <Link
        href="/api/auth/signin"
        className="bg-green-500 rounded-md py-2 px-4"
      >
        Sign in
      </Link>
    </>
  );
};
