import { BloodSugar } from "@prisma/client";
import dayjs from "dayjs";

export interface BloodSugarDTO extends Omit<BloodSugar, "datetime"> {
  datetime: string;
}

export function transformBloodSugar(bloodSugar: BloodSugar) {
  return {
    ...bloodSugar,
    datetime: dayjs(bloodSugar.datetime).format("YYYY-MM-DD HH:mm:ss"),
  };
}