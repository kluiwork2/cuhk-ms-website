import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import dayjs from "dayjs";
import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";
import { useMemo } from "react";
import { TimeRecordDTO } from "@/app/api/timeRecords/dto";

ChartJS.register(
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TimeRecordChartProps {
  timeRecords: TimeRecordDTO[];
}

const TimeRecordChart: React.FC<TimeRecordChartProps> = ({ timeRecords }) => {
  const timeDurationMap = useMemo(() => {
    const timeDurationMap: Record<string, number> = {};

    timeRecords.forEach((t) => {
      const time = dayjs(t.datetime).startOf("day").toISOString();
      if (timeDurationMap[time]) {
        timeDurationMap[time] += t.durationInMin;
      } else {
        timeDurationMap[time] = t.durationInMin;
      }
    });
    return timeDurationMap;
  }, [timeRecords]);

  return (
    <Line
      className="mb-5"
      height="300"
      options={{
        responsive: true,
        interaction: {
          mode: "index" as const,
          intersect: false,
        },
        plugins: {
          title: {
            display: true,
            text: "運動紀錄",
          },
          legend: {
            display: false,
          }
        },
        scales: {
          y: {
            min: 0,
            type: "linear" as const,
            display: true,
            title: {
              display: true,
              text: "分鐘",
            },
          },
          x: {
            type: "time",
            title: {
              display: true,
              text: "日期",
            },
          },
        },
      }}
      data={{
        labels:
          timeRecords.length > 0
            ? [
                dayjs(timeRecords[0].datetime).startOf("month").toDate(),
                dayjs(timeRecords[timeRecords.length - 1].datetime)
                  .endOf("month")
                  .toDate(),
              ]
            : [],
        datasets: [
          {
            data: Object.entries(timeDurationMap).map(([time, duration]) => ({
              x: time,
              y: duration,
            })),
            borderColor: "#4dc9f6",
            backgroundColor: "#4dc9f6",
            showLine: true,
          },
        ],
      }}
    />
  );
};

export default TimeRecordChart;
