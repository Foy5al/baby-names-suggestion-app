"use client";

import { useState } from "react";

type NameCardProps = {
  item: {
    id: string;
    name: string;
    meaning: string;
    suggestedBy: string;
    gender: "BOY" | "GIRL";
    votes: { id: string; voterFingerprint: string }[];
  };
  toggleVote: (id: string) => Promise<{ success: boolean; isNewVoter?: boolean; voterId?: string }>;
  hasVoted: boolean;
};

export default function NameCard({ item, toggleVote, hasVoted: initialHasVoted }: NameCardProps) {
  const [showMeaning, setShowMeaning] = useState(false);
  const [hasVoted, setHasVoted] = useState(initialHasVoted);
  const [voteCount, setVoteCount] = useState(item.votes.length);

  const handleVote = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the meaning from toggling when clicking the vote button
    
    try {
      const result = await toggleVote(item.id);
      
      if (result.success) {
        // Toggle the vote state and update the count
        const newVoteState = !hasVoted;
        setHasVoted(newVoteState);
        setVoteCount(prev => newVoteState ? prev + 1 : prev - 1);
        
        // If this is a new voter, set the cookie
        if (result.isNewVoter && result.voterId) {
          document.cookie = `voter_id=${result.voterId}; path=/; max-age=31536000; samesite=lax`;
        }
      }
    } catch (error) {
      console.error('Error toggling vote:', error);
    }
  };

  return (
    <div
      className={`p-4 rounded-xl transition-all duration-300 ${
        item.gender === "BOY"
          ? "bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50"
          : "bg-pink-50 dark:bg-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-900/30"
      }`}
      onClick={() => setShowMeaning(!showMeaning)}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                item.gender === "BOY"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-800/50 dark:text-blue-200"
                  : "bg-pink-100 text-pink-800 dark:bg-pink-800/50 dark:text-pink-200"
              }`}
            >
              {item.gender === "BOY" ? "Boy" : "Girl"}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-1">
            {item.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Suggested by {item.suggestedBy}
          </p>
        </div>

        <button
          onClick={handleVote}
          className={`flex items-center gap-1 px-3 py-1 rounded-full border transition font-medium ${
            hasVoted
              ? "bg-pink-500/50 text-white border-pink-500 dark:bg-pink-600/50 dark:border-pink-600"
              : "bg-white text-gray-500 border-gray-200 hover:border-pink-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:border-pink-400"
          }`}
          aria-label={hasVoted ? "Remove vote" : "Vote for this name"}
        >
          <span className={hasVoted ? "animate-pulse" : ""}>❤️</span>
          <span>{voteCount}</span>
        </button>
      </div>

      {showMeaning && (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm italic animate-in fade-in slide-in-from-top-1">
          <p className="font-medium text-gray-500 dark:text-gray-400 not-italic text-[10px] uppercase tracking-wider mb-1">
            Meaning:
          </p>
          {item.meaning}
        </div>
      )}
    </div>
  );
}