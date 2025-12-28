"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const passcode = formData.get("passcode");
  const correctPasscode = process.env.FAMILY_PASSCODE;

  if (passcode === correctPasscode) {
    const cookieStore = await cookies();
    // Set a cookie that lasts for 30 days
    cookieStore.set("family_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    redirect("/");
  } else {
    return { error: "Incorrect passcode. Please ask the parents!" };
  }
}
