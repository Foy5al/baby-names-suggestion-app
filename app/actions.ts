'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function toggleVote(nameId: string) {
  // Get or create voter ID
  const cookieStore = cookies();
  const allCookies = await cookieStore;
  let voterId = allCookies.get('voter_id')?.value;
  let isNewVoter = false;
  
  if (!voterId) {
    // Generate a simple fingerprint for the user
    voterId = Math.random().toString(36).substring(2, 15) + 
              Math.random().toString(36).substring(2, 15);
    isNewVoter = true;
  }
  
  // Check if the user has already voted for this name
  const existingVote = await prisma.vote.findFirst({
    where: {
      nameId,
      voterFingerprint: voterId,
    },
  });

  if (existingVote) {
    // Remove the vote if it exists
    await prisma.vote.delete({
      where: { id: existingVote.id },
    });
  } else {
    // Add a new vote
    await prisma.vote.create({
      data: {
        nameId,
        voterFingerprint: voterId,
      },
    });
  }
  
  // Revalidate the page to show updated votes
  revalidatePath('/');
  
  // Return whether this was a new voter (so the client can set the cookie)
  return { success: true, isNewVoter, voterId };
}
