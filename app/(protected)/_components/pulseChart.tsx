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
import { BloodPressureDTO } from "@/app/api/bloodPressures/dto";

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

const CHARTS: { title: string; key: keyof BloodPressureDTO }[] = [
  { title: "上壓 (mmHg)", key: "sbp" },
  { title: "下壓 (mmHg)", key: "dbp" },
  { title: "脈搏 (mmHg)", key: "pulse" },
];

interface PulseChartProps {
  bloodPressures: BloodPressureDTO[];
}

const PulseChart: React.FC<PulseChartProps> = ({ bloodPressures }) => {
  const { morning, afternoon, night } = useMemo(() => {
    let morning: BloodPressureDTO[] = [];
    let afternoon: BloodPressureDTO[] = [];
    let night: BloodPressureDTO[] = [];

    bloodPressures.forEach((t) => {
      const hour = dayjs(t.datetime).hour();
      if (hour > 5 && hour < 12) {
        morning.push(t);
      } else if (hour > 11 && hour < 18) {
        afternoon.push(t);
      } else {
        night.push(t);
      }
    });
    return { morning, afternoon, night };
  }, [bloodPressures]);

  return CHARTS.map(({ title, key }) => (
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
              text: "(mmHg)",
            },
          },
          x: {
            type: "time",
            title: {
              display: true,
              text: "Date",
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
            label: "上午",
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
            label: "下午",
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
            label: "晚上",
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
