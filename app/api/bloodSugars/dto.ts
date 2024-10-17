import { BloodSugar } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Hong_Kong");

export interface BloodSugarDTO extends Omit<BloodSugar, "datetime"> {
  datetime: string;
}

export function transformBloodSugar(bloodSugar: BloodSugar) {
  return {
    ...bloodSugar,
    datetime: dayjs(bloodSugar.datetime).toISOString(),
  };
}