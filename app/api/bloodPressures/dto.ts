import { BloodPressure } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Hong_Kong");

export interface BloodPressureDTO extends Omit<BloodPressure, "datetime"> {
  datetime: string;
}

export function transformBloodPressure(bloodPressure: BloodPressure) {
  return {
    ...bloodPressure,
    datetime: dayjs(bloodPressure.datetime).toISOString(),
  };
}