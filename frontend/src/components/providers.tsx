"use client";

import { SessionProvider } from "next-auth/react";
import * as React from "react";

export const Providers = ({ children }: React.PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};
