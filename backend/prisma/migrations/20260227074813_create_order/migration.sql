/*
  Warnings:

  - A unique constraint covering the columns `[order_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon_url` to the `recipe_ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `recipe_ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `recipe_ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "recipe_ingredients" ADD COLUMN     "icon_url" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "recipe_ingredient_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "couriers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "couriers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_id_key" ON "orders"("order_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_recipe_ingredient_id_fkey" FOREIGN KEY ("recipe_ingredient_id") REFERENCES "recipe_ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
