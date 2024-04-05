import { Button } from "@/components/ui/button";
import { loginWithAzure } from "@/utils/auth-actions";

export function SignInWithAzure() {
  return (
    <form action={loginWithAzure}>
      <Button buttonType="submit">Log in with Azure</Button>
    </form>
  );
}
