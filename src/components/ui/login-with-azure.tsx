"use server";

import { Button } from "@/components/ui/button";
import { loginWithAzure } from "@/utils/auth-actions";

export async function SignInWithAzure() {
  return (
    <form action={loginWithAzure}>
      <Button buttonType="submit" type="submit">
        Log in with Azure
      </Button>{" "}
    </form>
  );
}
