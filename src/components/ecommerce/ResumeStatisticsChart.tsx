import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";
import { useDashboardStore } from "../../store/dashboardStore";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function ResumeStatisticsChart() {
  const { resumes, loading } = useDashboardStore();

  const cumulative = Array.from({ length: 12 }, (_, i) =>
    resumes.filter((r) => new Date(r.createdAt).getMonth() <= i).length,
  );
  const optimized = Array.from(
    { length: 12 },
    (_, i) =>
      resumes.filter((r) => new Date(r.createdAt).getMonth() <= i && r.atsScore >= 80).length,
  );

  const options: ApexOptions = {
    legend: { show: false, position: "top", horizontalAlign: "left" },
    colors: ["#465FFF", "#9CB9FF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: { show: false },
    },
    stroke: { curve: "straight", width: [2, 2] },
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.55, opacityTo: 0 },
    },
    markers: { size: 0, strokeColors: "#fff", strokeWidth: 2, hover: { size: 6 } },
    grid: { xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
    dataLabels: { enabled: false },
    tooltip: { enabled: true, x: { format: "dd MMM yyyy" } },
    xaxis: {
      type: "category",
      categories: MONTHS,
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: {
      labels: { style: { fontSize: "12px", colors: ["#6B7280"] } },
      title: { text: "", style: { fontSize: "0px" } },
    },
  };

  const series = [
    { name: "Total Resumes", data: loading ? Array(12).fill(0) : cumulative },
    { name: "Optimized", data: loading ? Array(12).fill(0) : optimized },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Resume Statistics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Resume views and applications over time
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ChartTab />
        </div>
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <Chart options={options} series={series} type="area" height={310} />
        </div>
      </div>
    </div>
  );
}
