import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { TimeRecord } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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

  await db.timeRecord.delete({
    where: {
      id,
      authorId: userId,
    },
  });
  return new NextResponse(null, { status: 202 });
}