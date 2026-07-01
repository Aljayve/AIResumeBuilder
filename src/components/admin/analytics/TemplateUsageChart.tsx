import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface DataPoint {
    name: string;
    usage: number;
}

interface Props {
    data: DataPoint[];
}

const COLORS = ["#4653E9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function TemplateUsageChart({ data }: Props) {
    const total = data.reduce((sum, d) => sum + d.usage, 0);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Template Usage</h3>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Distribution across templates</p>
            </div>

            <div className="mt-6 flex flex-col items-center lg:flex-row lg:items-center lg:gap-6">
                <div className="h-56 w-56 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="usage"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={90}
                                paddingAngle={2}
                            >
                                {data.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    borderRadius: "12px",
                                    border: "1px solid #E2E8F0",
                                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                                }}
                                formatter={(value: number) => [value.toLocaleString(), "Usage"]}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-4 w-full space-y-2.5 lg:mt-0 lg:flex-1">
                    {data.map((d, i) => {
                        const pct = ((d.usage / total) * 100).toFixed(0);
                        return (
                            <div key={d.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                    <span className="text-gray-700 dark:text-gray-300">{d.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="hidden w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 sm:block">
                                        <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                                    </div>
                                    <span className="w-10 text-right font-medium text-gray-900 dark:text-white">{pct}%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
