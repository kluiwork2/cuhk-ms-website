import { BloodPressure } from "@prisma/client";
import dayjs from "dayjs";

export interface BloodPressureDTO extends Omit<BloodPressure, "datetime"> {
  datetime: string;
}

export function transformBloodPressure(bloodPressure: BloodPressure) {
  return {
    ...bloodPressure,
    datetime: dayjs(bloodPressure.datetime).format("YYYY-MM-DD HH:mm:ss"),
  };
}