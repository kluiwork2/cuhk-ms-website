import { TimeRecordDTO as TimeRecord } from "@/app/api/timeRecords/dto";
import { BloodPressureDTO as BloodPressure } from "@/app/api/bloodPressures/dto";
import { BloodSugarDTO as BloodSugar } from "@/app/api/bloodSugars/dto";
import classnames from "classnames";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { BloodPressureDialog } from "./BloodPressureDialog";
import { BloodSugarDialog } from "./BloodSugarDialog";
import { TimeRecordDialog } from "./TimeRecordDialog";
interface Props {
  timeRecords: TimeRecord[];
  bloodSugars: BloodSugar[];
  bloodPressures: BloodPressure[];
  onUpdatedSuccess: (
    type?: "timeRecords" | "bloodSugars" | "bloodPressures"
  ) => void;
}

export const ListTable: React.FC<Props> = ({
  timeRecords = [],
  bloodSugars = [],
  bloodPressures = [],
  onUpdatedSuccess,
}) => {
  const [deletingTimeRecord, setDeletingTimeRecord] = useState<string | null>();
  const [deletingBloodSugar, setDeletingBloodSugar] = useState<string | null>();
  const [deletingBloodPressure, setDeletingBloodPressure] = useState<
    string | null
  >();

  const deleteTimeRecord = useCallback(
    async (id: string) => {
      try {
        setDeletingTimeRecord(id);
        await fetch(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/timeRecords/${id}`,
          {
            method: "DELETE",
          }
        );
        toast.success("成功刪除活動");
        onUpdatedSuccess("timeRecords");
      } catch (error) {
        toast.error("刪除活動失敗，請稍後再試");
        console.error(error);
      }
      setDeletingTimeRecord(null);
    },
    [onUpdatedSuccess]
  );

  const deleteBloodSugar = useCallback(
    async (id: string) => {
      try {
        setDeletingBloodSugar(id);
        await fetch(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/bloodSugars/${id}`,
          {
            method: "DELETE",
          }
        );
        toast.success("成功刪除血糖紀錄");
        onUpdatedSuccess("bloodSugars");
      } catch (error) {
        toast.error("刪除血糖紀錄失敗，請稍後再試");
        console.error(error);
      }
      setDeletingBloodSugar(null);
    },
    [onUpdatedSuccess]
  );

  const deleteBloodPressure = useCallback(
    async (id: string) => {
      try {
        setDeletingBloodPressure(id);
        await fetch(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/bloodPressures/${id}`,
          {
            method: "DELETE",
          }
        );
        toast.success("成功刪除血壓紀錄");
        onUpdatedSuccess("bloodPressures");
      } catch (error) {
        toast.error("刪除血壓紀錄失敗，請稍後再試");
        console.error(error);
      }
      setDeletingBloodPressure(null);
    },
    [onUpdatedSuccess]
  );

  return (
    <div>
      <div className="grid grid-cols-4 pb-12">
        <div className="col-span-4 py-2 text-xl">運動紀錄</div>
        {timeRecords?.length > 0 && (
          <>
            <div className="bg-blue-600 text-white px-4 py-2 rounded-tl-md">
              日期
            </div>
            <div className="bg-blue-600 text-white px-4 py-2">活動類型</div>
            <div className="bg-blue-600 text-white px-4 py-2 rounded-tr-md col-span-2">
              持續時間
            </div>
          </>
        )}
        {timeRecords?.map((timeRecord, key) => (
          <>
            <div
              className={classnames({
                "bg-white px-4 py-2 flex items-center": true,
                "rounded-bl-md": key === timeRecords.length - 1,
              })}
            >
              {timeRecord.datetime}
            </div>
            <div className="bg-white px-4 py-2 flex items-center">
              {timeRecord.activityType}
            </div>
            <div className="bg-white px-4 py-2 flex items-center">
              {timeRecord.durationInMin}分鐘
            </div>
            <div
              className={classnames({
                "bg-white px-4 py-2": true,
                "rounded-br-md": key === timeRecords.length - 1,
              })}
            >
              <div className="flex gap-2 md:flex-row flex-col">
                <TimeRecordDialog
                  timeRecord={timeRecord}
                  onSuccess={() => onUpdatedSuccess("timeRecords")}
                />
                <Button
                  className="text-white px-4 py-2"
                  type="button"
                  variant="destructive"
                  onClick={async () => {
                    await deleteTimeRecord(timeRecord.id);
                  }}
                >
                  {deletingTimeRecord === timeRecord.id ? "刪除中..." : "刪除"}
                </Button>
              </div>
            </div>
          </>
        ))}
      </div>

      <div className="pb-12">
        <div className="py-2 text-xl">血糖紀錄</div>
        {bloodSugars?.map((bloodSugar, key) => (
          <div key={key} className="bg-white rounded-lg mb-4">
            <div className="flex justify-between items-center bg-blue-600 px-4 py-2 rounded-t-lg">
              <div className="text-white">日期：{bloodSugar.datetime}</div>
              <div className="flex gap-2">
                <BloodSugarDialog
                  bloodSugar={bloodSugar}
                  onSuccess={() => onUpdatedSuccess("bloodSugars")}
                />
                <Button
                  className="text-white px-4 py-2"
                  type="button"
                  variant="destructive"
                  onClick={async () => {
                    await deleteBloodSugar(bloodSugar.id);
                  }}
                >
                  {deletingBloodSugar === bloodSugar.id ? "刪除中..." : "刪除"}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 px-4 py-2">
              <div>早餐前：{bloodSugar.beforeBreakfast ?? "-"} mmol/L</div>
              <div>早餐後：{bloodSugar.afterBreakfast ?? "-"} mmol/L</div>
              <div>午餐前：{bloodSugar.beforeLunch ?? "-"} mmol/L</div>
              <div>午餐後：{bloodSugar.afterLunch ?? "-"} mmol/L</div>
              <div>晚餐前：{bloodSugar.beforeDinner ?? "-"} mmol/L</div>
              <div>晚餐後：{bloodSugar.afterDinner ?? "-"} mmol/L</div>
              <div className="col-span-2">
                睡前：{bloodSugar.beforeSleep ?? "-"} mmol/L
              </div>
              <div>備註：{bloodSugar.remarks ?? "-"}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="pb-12">
        <div className="py-2 text-xl">血壓紀錄</div>
        {bloodPressures?.map((bloodPressure, key) => (
          <div key={key} className="bg-white rounded-lg mb-4">
            <div className="flex justify-between bg-blue-600 px-4 py-2 rounded-t-lg items-center">
              <div className="text-white">日期：{bloodPressure.datetime}</div>
              <div className="flex gap-2">
                <BloodPressureDialog
                  bloodPressure={bloodPressure}
                  onSuccess={() => onUpdatedSuccess("bloodPressures")}
                />
                <Button
                  className="text-white px-4 py-2"
                  type="button"
                  variant="destructive"
                  onClick={async () => {
                    await deleteBloodPressure(bloodPressure.id);
                  }}
                >
                  {deletingBloodPressure === bloodPressure.id
                    ? "刪除中..."
                    : "刪除"}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 px-4 py-2">
              <div>上壓: {bloodPressure.sbp ?? "-"} mmhg</div>
              <div>下壓: {bloodPressure.dbp ?? "-"} mmhg</div>
              <div>脈搏: {bloodPressure.pulse ?? "-"} mmhg</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
