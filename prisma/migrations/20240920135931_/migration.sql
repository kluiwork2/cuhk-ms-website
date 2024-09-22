-- CreateTable
CREATE TABLE "BloodSugar" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "beforeBreakfast" INTEGER,
    "afterBreakfast" INTEGER,
    "beforeLunch" INTEGER,
    "afterLunch" INTEGER,
    "beforeDinner" INTEGER,
    "afterDinner" INTEGER,
    "beforeSleep" INTEGER,
    "remarks" TEXT NOT NULL,

    CONSTRAINT "BloodSugar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BloodPressure" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "sbp" INTEGER,
    "dbp" INTEGER,
    "pulse" INTEGER,

    CONSTRAINT "BloodPressure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BloodSugar_authorId_idx" ON "BloodSugar"("authorId");

-- CreateIndex
CREATE INDEX "BloodSugar_authorId_datetime_idx" ON "BloodSugar"("authorId", "datetime");

-- CreateIndex
CREATE INDEX "BloodPressure_authorId_idx" ON "BloodPressure"("authorId");

-- CreateIndex
CREATE INDEX "BloodPressure_authorId_datetime_idx" ON "BloodPressure"("authorId", "datetime");

-- AddForeignKey
ALTER TABLE "BloodSugar" ADD CONSTRAINT "BloodSugar_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodPressure" ADD CONSTRAINT "BloodPressure_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
