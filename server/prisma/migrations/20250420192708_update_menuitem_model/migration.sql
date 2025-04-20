-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "cuisineRegion" TEXT,
ADD COLUMN     "isHeartHealthy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isHighFiber" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isHighProtein" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVeg" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "mealType" TEXT,
ADD COLUMN     "standardIngredients" TEXT;
