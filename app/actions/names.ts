"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { nanoid } from "nanoid"; // Install with: npm install nanoid

async function getVoterId() {
  const cookieStore = await cookies();
  let voterId = cookieStore.get("voter_id")?.value;
  if (!voterId) {
    voterId = nanoid();
    cookieStore.set("voter_id", voterId, { maxAge: 60 * 60 * 24 * 365 });
  }
  return voterId;
}

export async function addName(formData: FormData) {
  const name = formData.get("name") as string;
  const meaning = formData.get("meaning") as string;
  const gender = formData.get("gender") as "BOY" | "GIRL";
  const suggestedBy = formData.get("suggestedBy") as string;

  await prisma.nameSuggestion.create({
    data: { name, meaning, gender, suggestedBy },
  });

  revalidatePath("/");
}

export async function toggleVote(nameId: string) {
  const voterId = await getVoterId();

  const existingVote = await prisma.vote.findUnique({
    where: { voterFingerprint_nameId: { voterFingerprint: voterId, nameId } },
  });

  if (existingVote) {
    await prisma.vote.delete({ where: { id: existingVote.id } });
  } else {
    await prisma.vote.create({
      data: { voterFingerprint: voterId, nameId },
    });
  }

  revalidatePath("/");
}
