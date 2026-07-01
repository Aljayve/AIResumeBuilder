import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useDashboardStore } from "../../store/dashboardStore";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function AtsScoreChart() {
  const { resumes, loading } = useDashboardStore();

  const monthly = resumes.reduce(
    (acc, r) => {
      const m = new Date(r.updatedAt).getMonth();
      acc[m].total += r.atsScore;
      acc[m].count += 1;
      return acc;
    },
    Array.from({ length: 12 }, () => ({ total: 0, count: 0 })),
  );

  const data = monthly.map((m) => (m.count ? Math.round(m.total / m.count) : 0));

  const options: ApexOptions = {
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 4, colors: ["transparent"] },
    xaxis: {
      categories: MONTHS,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: { show: true, position: "top", horizontalAlign: "left", fontFamily: "Outfit" },
    yaxis: { title: { text: undefined }, min: 0, max: 100 },
    grid: { yaxis: { lines: { show: true } } },
    fill: { opacity: 1 },
    tooltip: { x: { show: false }, y: { formatter: (val: number) => `${val}%` } },
  };

  const series = [
    {
      name: "ATS Score",
      data: loading ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : data,
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          ATS Score Overview
        </h3>
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <Chart options={options} series={series} type="bar" height={180} />
        </div>
      </div>
    </div>
  );
}
