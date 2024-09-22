import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { transformBloodPressure } from "../dto";

interface PutRequestBody {
  datetime: string;
  sbp: number;
  dbp: number;
  pulse: number;
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
  const { datetime, sbp, dbp, pulse }: PutRequestBody = await request.json();
  const { id } = params;

  const bloodPressure = await db.bloodPressure.update({
    data: {
      datetime,
      sbp,
      dbp,
      pulse,
    },
    where: {
      id,
      authorId: userId,
    },
  });
  return NextResponse.json(transformBloodPressure(bloodPressure));
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

  await db.bloodPressure.delete({
    where: {
      id,
      authorId: userId,
    },
  });
  return new NextResponse(null, { status: 202 });
}
