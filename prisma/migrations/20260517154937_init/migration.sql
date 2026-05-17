-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otp" VARCHAR(6),
ADD COLUMN     "otpExpiry" TIMESTAMP(3);
