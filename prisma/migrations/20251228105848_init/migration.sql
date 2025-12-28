-- CreateTable
CREATE TABLE "NameSuggestion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "suggestedBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "voterFingerprint" TEXT NOT NULL,
    "nameId" TEXT NOT NULL,
    CONSTRAINT "Vote_nameId_fkey" FOREIGN KEY ("nameId") REFERENCES "NameSuggestion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "NameSuggestion_name_key" ON "NameSuggestion"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_voterFingerprint_nameId_key" ON "Vote"("voterFingerprint", "nameId");
