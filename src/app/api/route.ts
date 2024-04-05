import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const response = new Response("hello");

  console.log(token);
  console.log(response);

  redirect("/");
}

export async function POST(response: Response) {
  const callback = "https://uphvkzpmspfojxfvkxcu.supabase.co/auth/v1/callback";

  redirect("/");
}
