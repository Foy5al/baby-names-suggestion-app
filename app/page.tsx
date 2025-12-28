import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import AddNameModal from "./components/AddNameModal";
import NameCard from "./components/NameCard";
import { Prisma } from "@prisma/client";
import { toggleVote } from "./actions";

// This creates a type that exactly matches what Prisma returns (Name + Votes)
/* type NameWithVotes = Prisma.NameSuggestionGetPayload<{
  include: { votes: true };
}>; */
type NameWithVotes = Prisma.NameSuggestionGetPayload<{
  include: { votes: true };
}> & {
  gender: "BOY" | "GIRL";
};
function isGender(gender: string): gender is "BOY" | "GIRL" {
  return gender === "BOY" || gender === "GIRL";
}

// Server action is now imported from actions.ts

export default async function HomePage() {
  // Fetch names. We remove the "?." because if database fails,
  // we want to see the real error, not a "undefined" crash.
  let names = [];
  try {
    names = await prisma.nameSuggestion.findMany({
      include: { votes: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Database not ready yet:", error);
    // This allows the build to finish even if the DB is acting up
    return <div>Database is connecting... please refresh.</div>; 
  }
  // Filter out any names with invalid genders (shouldn't happen if your DB enforces this)
  const validNames = names.filter((name): name is NameWithVotes => 
    isGender(name.gender)
  );
  const cookieStore = await cookies();
  const voterId = cookieStore.get('voter_id')?.value;
  // Now TypeScript knows these are properly typed
  const boys = validNames.filter((n) => n.gender === "BOY");
  const girls = validNames.filter((n) => n.gender === "GIRL");

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-gray-900 p-4 md:p-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Baby Names 👶
          </h1>
          <AddNameModal />
        </header>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Girls Column */}
          <section>
            <h2 className="text-pink-600 dark:text-pink-400 font-bold mb-4 flex items-center gap-2 text-xl">
              🎀 Girls
            </h2>
            <div className="space-y-3">
              {girls.length > 0 ? (
                girls.map((name) => (
                  <NameCard
                    key={name.id}
                    item={name}
                    toggleVote={toggleVote}
                    hasVoted={name.votes.some(
                      (v) => v.voterFingerprint === voterId
                    )}
                  />
                ))
              ) : (
                <p className="text-gray-400 italic text-sm">
                  No girl names suggested yet.
                </p>
              )}
            </div>
          </section>

          {/* Boys Column */}
           <section>
            <h2 className="text-blue-600 dark:text-blue-400 font-bold mb-4 flex items-center gap-2 text-xl">
              👔 Boys
            </h2>
            <div className="space-y-3">
              {boys.length > 0 ? (
                boys.map((name) => (
                  <NameCard
                    key={name.id}
                    item={name}
                    toggleVote={toggleVote}
                    hasVoted={name.votes.some(
                      (v) => v.voterFingerprint === voterId
                    )}
                  />
                ))
              ) : (
                <p className="text-gray-400 italic text-sm">
                  No boy names suggested yet.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
