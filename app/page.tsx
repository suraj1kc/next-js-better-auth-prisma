import { auth } from "@/lib/auth";
import { signIn, signUp } from "@/server/user";
import { Sign } from "crypto";
import { headers } from "next/headers";
import SignOut from "./signout";

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return (
        <main className="flex flex-col items-center justify-between p-24">
          <button onClick={signIn}>Sign In</button>
          <button onClick={signUp}>Sign Up</button>
          <SignOut />
          <p>{!session ? "Not Authenticated" : session.user.name}</p>
          </main>
    );
}