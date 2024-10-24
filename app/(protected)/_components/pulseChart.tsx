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
import { useMemo } from "react";
import { BloodPressureDTO } from "@/app/api/bloodPressures/dto";
import "chartjs-adapter-date-fns";
import { zhHK } from "date-fns/locale";
import _groupBy from "lodash/groupBy";

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

const CHARTS: { title: string; key: keyof BloodPressureDTO, yTitle: string }[] = [
  { title: "上壓 (mmHg)", key: "sbp", yTitle: "mmHg" },
  { title: "下壓 (mmHg)", key: "dbp", yTitle: "mmHg" },
  { title: "脈搏 (次/分鐘)", key: "pulse", yTitle: "次/分鐘" },
];

interface PulseChartProps {
  bloodPressures: BloodPressureDTO[];
}

const PulseChart: React.FC<PulseChartProps> = ({ bloodPressures }) => {
  const { morning, afternoon, night } = useMemo(() => {
    let morningMap: { [date: string]: BloodPressureDTO } = {};
    let afternoonMap: { [date: string]: BloodPressureDTO } = {};
    let nightMap: { [date: string]: BloodPressureDTO } = {};

    bloodPressures.forEach((t) => {
      const hour = dayjs(t.datetime).hour();
      const date = dayjs(t.datetime).format("YYYY-MM-DD");

      if (hour > 5 && hour < 12) {
        if (!morningMap[date]) {
          morningMap[date] = t;
        }
        morningMap[date] =
          t.datetime > morningMap[date].datetime ? t : morningMap[date];
      } else if (hour > 11 && hour < 18) {
        if (!afternoonMap[date]) {
          afternoonMap[date] = t;
        }
        afternoonMap[date] =
          t.datetime > afternoonMap[date].datetime ? t : afternoonMap[date];
      } else {
        if (!nightMap[date]) {
          nightMap[date] = t;
        }
        nightMap[date] =
          t.datetime > nightMap[date].datetime ? t : nightMap[date];
      }
    });
    return {
      morning: Object.values(morningMap),
      afternoon: Object.values(afternoonMap),
      night: Object.values(nightMap),
    };
  }, [bloodPressures]);

  return CHARTS.map(({ title, key, yTitle }) => (
    <Line
      className="mb-5"
      key={key}
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
            text: title,
          },
        },
        scales: {
          y: {
            min: 0,
            max: 200,
            type: "linear" as const,
            display: true,
            title: {
              display: true,
              text: yTitle,
            },
          },
          x: {
            type: "time",
            title: {
              display: true,
              text: "日期",
            },
            adapters: {
              date: {
                locale: zhHK,
              },
            },
            min: dayjs().add(-30, "days").toISOString(),
            max: dayjs().toISOString(),
            ticks: {
              includeBounds: true,
            },
          },
        },
      }}
      data={{
        labels:
          bloodPressures.length > 0
            ? [
                dayjs(bloodPressures[0].datetime).startOf("month").toDate(),
                dayjs(bloodPressures[bloodPressures.length - 1].datetime)
                  .endOf("month")
                  .toDate(),
              ]
            : [],
        datasets: [
          {
            label: "上午：06:00 - 11:59",
            data: morning
              .filter((t) => dayjs(t.datetime))
              .map((t) => ({
                x: t.datetime,
                y: t[key],
              })),
            borderColor: "#4dc9f6",
            backgroundColor: "#4dc9f6",
            tension: 0.1,
            showLine: false,
          },
          {
            label: "下午：12:00 - 17:59",
            data: afternoon
              .filter((t) => dayjs(t.datetime))
              .map((t) => ({
                x: t.datetime,
                y: t[key],
              })),
            borderColor: "#f67019",
            backgroundColor: "#f67019",
            tension: 0.1,
            showLine: false,
          },
          {
            label: "晚上：18:00 - 第二日05:59",
            data: night
              .filter((t) => dayjs(t.datetime))
              .map((t) => ({
                x: t.datetime,
                y: t[key],
              })),
            borderColor: "#f53794",
            backgroundColor: "#f53794",
            tension: 0.1,
            showLine: false,
          },
        ],
      }}
    />
  ));
};

export default PulseChart;
