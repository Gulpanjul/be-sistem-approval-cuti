-- CreateEnum
CREATE TYPE "Role" AS ENUM ('EMPLOYEE', 'HEAD', 'GM');

-- CreateEnum
CREATE TYPE "CutiType" AS ENUM ('SAKIT', 'IZIN', 'TAHUNAN');

-- CreateEnum
CREATE TYPE "CutiStatus" AS ENUM ('draft', 'pending_head', 'revisi', 'pending_gm', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('submit', 'approve', 'reject', 'request_revision', 'update');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cuti" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "type" "CutiType" NOT NULL,
    "reason" TEXT NOT NULL,
    "attachment" TEXT,
    "status" "CutiStatus" NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cuti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CutiHistory" (
    "id" SERIAL NOT NULL,
    "cutiId" INTEGER NOT NULL,
    "actorId" INTEGER,
    "role" "Role" NOT NULL,
    "action" "ActionType" NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CutiHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Cuti" ADD CONSTRAINT "Cuti_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CutiHistory" ADD CONSTRAINT "CutiHistory_cutiId_fkey" FOREIGN KEY ("cutiId") REFERENCES "Cuti"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CutiHistory" ADD CONSTRAINT "CutiHistory_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
