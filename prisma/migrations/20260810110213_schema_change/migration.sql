/*
  Warnings:

  - Added the required column `imageFullUrl` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageLinkHTML` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageThumbnail` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUserName` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imageFullUrl" TEXT NOT NULL,
ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "imageLinkHTML" TEXT NOT NULL,
ADD COLUMN     "imageThumbnail" TEXT NOT NULL,
ADD COLUMN     "imageUserName" TEXT NOT NULL,
ADD COLUMN     "orgId" TEXT NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;
