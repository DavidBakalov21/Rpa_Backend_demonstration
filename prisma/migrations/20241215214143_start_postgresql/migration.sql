-- CreateTable
CREATE TABLE "User" (
    "_id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "creatorId" TEXT,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "_LikedQuotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LikedQuotes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE INDEX "_LikedQuotes_B_index" ON "_LikedQuotes"("B");

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedQuotes" ADD CONSTRAINT "_LikedQuotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Quote"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedQuotes" ADD CONSTRAINT "_LikedQuotes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
