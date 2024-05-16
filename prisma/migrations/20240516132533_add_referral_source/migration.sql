-- AlterTable
ALTER TABLE "User" ADD COLUMN     "referralSourceId" INTEGER;

-- CreateTable
CREATE TABLE "Referral" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referralSourceId_fkey" FOREIGN KEY ("referralSourceId") REFERENCES "Referral"("id") ON DELETE SET NULL ON UPDATE CASCADE;
