import { LoginButton } from "@/components/LoginButton";
import { getUserDetailsFromEmailId, isAuthenticated } from "./actions";

export default async function Home() {
  const email = await isAuthenticated();
  const user = await getUserDetailsFromEmailId(email);
  if (!user) {
    return (
      <div>
        <h1>Not Authenticated</h1>
      </div>
    )

  }

  return (
    <div>
      {user.name}
      <br />
      {user.email}

      <LoginButton />
    </div>
  );
}
