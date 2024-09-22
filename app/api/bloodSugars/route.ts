import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { BloodSugar } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import { MONTHLY_SCHEDULER_MONTH_RANGE } from "@/constants/monthlyscheduler";
import { transformBloodSugar } from "./dto";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return new NextResponse(null, { status: 401 });
  }

  const { id: userId } = user;

  const bloodSugar = await db.bloodSugar.findMany({
    where: {
      authorId: userId,
      datetime: {
        gte: dayjs()
          .add(-MONTHLY_SCHEDULER_MONTH_RANGE, "months")
          .toISOString(),
        lte: dayjs().add(MONTHLY_SCHEDULER_MONTH_RANGE, "months").toISOString(),
      },
    },
    orderBy: {
      datetime: "asc",
    },
  });
  return NextResponse.json(bloodSugar.map(transformBloodSugar));
}

interface PostRequestBody {
  datetime: string;
  beforeBreakfast?: number;
  afterBreakfast?: number;
  beforeLunch?: number;
  afterLunch?: number;
  beforeDinner?: number;
  afterDinner?: number;
  beforeSleep?: number;
  remarks?: string;
}

export async function POST(request: NextRequest, res: NextResponse) {
  const user = await currentUser();

  if (!user) {
    return new NextResponse(null, { status: 401 });
  }

  const { id: userId } = user;
  const {
    datetime,
    beforeBreakfast,
    afterBreakfast,
    beforeLunch,
    afterLunch,
    beforeDinner,
    afterDinner,
    beforeSleep,
    remarks,
  }: PostRequestBody = await request.json();

  const bloodSugar = await db.bloodSugar.create({
    data: {
      authorId: userId,
      datetime,
      beforeBreakfast,
      afterBreakfast,
      beforeLunch,
      afterLunch,
      beforeDinner,
      afterDinner,
      beforeSleep,
      remarks,
    },
  });
  return NextResponse.json(transformBloodSugar(bloodSugar));
}
