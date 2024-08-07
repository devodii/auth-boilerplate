import { SignInBtn } from "@/components/auth";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 w-screen h-screen items-center justify-center">
      <p>Hello world</p>
      <SignInBtn />
    </main>
  );
}
