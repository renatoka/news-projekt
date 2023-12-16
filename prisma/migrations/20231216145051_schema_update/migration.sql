-- CreateTable
CREATE TABLE "_articlesTousers" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_articlesTousers_AB_unique" ON "_articlesTousers"("A", "B");

-- CreateIndex
CREATE INDEX "_articlesTousers_B_index" ON "_articlesTousers"("B");

-- AddForeignKey
ALTER TABLE "_articlesTousers" ADD CONSTRAINT "_articlesTousers_A_fkey" FOREIGN KEY ("A") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_articlesTousers" ADD CONSTRAINT "_articlesTousers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
