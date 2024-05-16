-- CreateEnum
CREATE TYPE "PricingPlan" AS ENUM ('BASIC', 'PRO');

-- CreateEnum
CREATE TYPE "PricingType" AS ENUM ('ONE_TIME', 'RECURRING');

-- CreateEnum
CREATE TYPE "PricingInterval" AS ENUM ('DAY', 'WEEK', 'MONTH', 'YEAR');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('TRIALING', 'ACTIVE', 'CANCELED', 'INCOMPLETE', 'INCOMPLETE_EXPIRED', 'PAST_DUE', 'UNPAID', 'PAUSED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "billingAddress" JSONB,
    "paymentMethod" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistrationInitializer" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "signUpCompleted" BOOLEAN NOT NULL DEFAULT false,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "businessCreated" BOOLEAN NOT NULL DEFAULT false,
    "planSelected" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RegistrationInitializer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pricing" (
    "id" TEXT NOT NULL,
    "unitAmount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "type" "PricingType",
    "interval" "PricingInterval" NOT NULL,
    "intervalCount" INTEGER NOT NULL,
    "trialPeriodDays" INTEGER NOT NULL,
    "metadata" JSONB,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" "PricingPlan" NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "status" "SubscriptionStatus" NOT NULL,
    "priceId" TEXT NOT NULL,
    "quantity" INTEGER,
    "cancelAtPeriodEnd" BOOLEAN NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentPeriodStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "canceledAt" TIMESTAMP(3),
    "trialStart" TIMESTAMP(3),
    "trialEnd" TIMESTAMP(3),
    "metadata" JSONB,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeProfile" (
    "id" INTEGER NOT NULL,
    "publicId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "organizationId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "seniority" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "profilePicture" INTEGER NOT NULL,

    CONSTRAINT "EmployeeProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationSubscription" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "pricingId" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "numberOfEmployee" INTEGER NOT NULL,
    "amountPaid" INTEGER NOT NULL,
    "billingCycle" TEXT NOT NULL,
    "startDate" INTEGER NOT NULL,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "OrganizationSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" INTEGER NOT NULL,
    "publicId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tradingName" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "businessRegistrationNumber" TEXT NOT NULL,
    "taxId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrimaryAddress" (
    "id" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "primary" BOOLEAN NOT NULL,

    CONSTRAINT "PrimaryAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "streetOne" TEXT NOT NULL,
    "streetTwo" TEXT,
    "city" TEXT,
    "state" TEXT,
    "countryIsoCode" TEXT NOT NULL,
    "zipCode" TEXT,
    "country" TEXT,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessOwnerProfile" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "BusinessOwnerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointOfContact" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "PointOfContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EditHistory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "object" JSONB NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EditHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignUpInterest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SignUpInterest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignUpAnalytics" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "interestedIn" JSONB NOT NULL,

    CONSTRAINT "SignUpAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_publicId_key" ON "User"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationInitializer_userId_key" ON "RegistrationInitializer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeProfile_publicId_key" ON "EmployeeProfile"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_publicId_key" ON "Organization"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "PrimaryAddress_addressId_key" ON "PrimaryAddress"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "PrimaryAddress_organizationId_key" ON "PrimaryAddress"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "PrimaryAddress_organizationId_addressId_key" ON "PrimaryAddress"("organizationId", "addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_publicId_key" ON "Session"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessOwnerProfile_userId_key" ON "BusinessOwnerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessOwnerProfile_organizationId_key" ON "BusinessOwnerProfile"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "SignUpInterest_name_key" ON "SignUpInterest"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SignUpAnalytics_organizationId_key" ON "SignUpAnalytics"("organizationId");

-- AddForeignKey
ALTER TABLE "RegistrationInitializer" ADD CONSTRAINT "RegistrationInitializer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Pricing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrimaryAddress" ADD CONSTRAINT "PrimaryAddress_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrimaryAddress" ADD CONSTRAINT "PrimaryAddress_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessOwnerProfile" ADD CONSTRAINT "BusinessOwnerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessOwnerProfile" ADD CONSTRAINT "BusinessOwnerProfile_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointOfContact" ADD CONSTRAINT "PointOfContact_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
