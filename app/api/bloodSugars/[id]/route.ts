import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface PutRequestBody {
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
  }: PutRequestBody = await request.json();
  const { id } = params;

  const bloodSugar = await db.bloodSugar.update({
    data: {
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
    where: {
      id,
      authorId: userId,
    },
  });
  return NextResponse.json(bloodSugar);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await currentUser();

  if (!user) {
    return new NextResponse(null, { status: 401 });
  }

  const { id: userId } = user;
  const { id } = params;

  await db.bloodSugar.delete({
    where: {
      id,
      authorId: userId,
    },
  });
  return new NextResponse(null, { status: 202 });
}