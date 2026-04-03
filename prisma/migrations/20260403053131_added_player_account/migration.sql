-- CreateEnum
CREATE TYPE "PetVariant" AS ENUM ('NORMAL', 'NEON', 'MEGA');

-- CreateEnum
CREATE TYPE "PetPotion" AS ENUM ('NONE', 'RIDE', 'FLY', 'FLY_RIDE');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('PET', 'PET_WEAR', 'FOOD');

-- CreateTable
CREATE TABLE "player_account" (
    "id" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "potions" INTEGER NOT NULL DEFAULT 0,
    "bucks" INTEGER NOT NULL DEFAULT 0,
    "eventCurrency" INTEGER NOT NULL DEFAULT 0,
    "tickets" INTEGER NOT NULL DEFAULT 0,
    "lastSeen" TIMESTAMP(3),
    "upTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "player_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" TEXT NOT NULL,
    "playerAccountId" TEXT NOT NULL,
    "type" "ItemType" NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "variant" "PetVariant" NOT NULL,
    "potion" "PetPotion" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pet_itemId_key" ON "pet"("itemId");

-- AddForeignKey
ALTER TABLE "player_account" ADD CONSTRAINT "player_account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_playerAccountId_fkey" FOREIGN KEY ("playerAccountId") REFERENCES "player_account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
