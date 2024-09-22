import { TimeRecord, activityType as ActivityEnum } from "@prisma/client";
import dayjs from "dayjs";

export interface TimeRecordDTO
  extends Omit<TimeRecord, "datetime" | "activityType"> {
  datetime: string;
  activityType: string;
}

export function transformTimeRecord(timeRecord: TimeRecord) {
  return {
    ...timeRecord,
    activityType: transformActivityType(timeRecord.activityType),
    datetime: dayjs(timeRecord.datetime).format("YYYY-MM-DD HH:mm:ss"),
  };
}

export function transformActivityTypeEnum(activityType: string) {
  switch (activityType) {
    case "WALKING":
      return ActivityEnum.WALKING;
    case "TAI_JI":
      return ActivityEnum.TAI_JI;
    case "STRETCHING":
      return ActivityEnum.STRETCHING;
    case "FAST_WALK":
      return ActivityEnum.FAST_WALK;
    case "SWIMMING":
      return ActivityEnum.SWIMMING;
    case "RACING":
      return ActivityEnum.RACING;
    case "RUNNING":
      return ActivityEnum.RUNNING;
    case "YOGA":
      return ActivityEnum.YOGA;
    case "GOLF":
      return ActivityEnum.GOLF;
    case "BALL":
      return ActivityEnum.BALL;
    case "DANCE":
      return ActivityEnum.DANCE;
    case "HIKING":
      return ActivityEnum.HIKING;
    case "TENNIS":
      return ActivityEnum.TENNIS;
    case "BOXING":
      return ActivityEnum.BOXING;
    default:
      throw new Error("Invalid activity type");
  }
}

export function transformActivityType(activityType: ActivityEnum) {
  switch (activityType) {
    case ActivityEnum.WALKING:
      return "WALKING";
    case ActivityEnum.TAI_JI:
      return "TAI_JI";
    case ActivityEnum.STRETCHING:
      return "STRETCHING";
    case ActivityEnum.FAST_WALK:
      return "FAST_WALK";
    case ActivityEnum.SWIMMING:
      return "SWIMMING";
    case ActivityEnum.RACING:
      return "RACING";
    case ActivityEnum.RUNNING:
      return "RUNNING";
    case ActivityEnum.YOGA:
      return "YOGA";
    case ActivityEnum.GOLF:
      return "GOLF";
    case ActivityEnum.BALL:
      return "BALL";
    case ActivityEnum.DANCE:
      return "DANCE";
    case ActivityEnum.HIKING:
      return "HIKING";
    case ActivityEnum.TENNIS:
      return "TENNIS";
    case ActivityEnum.BOXING:
      return "BOXING";
    default:
      throw new Error("Invalid activity type");
  }
}
