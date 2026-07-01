import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

interface DataPoint {
    month: string;
    users: number;
}

interface Props {
    data: DataPoint[];
}

const periods = ["7D", "30D", "6M", "1Y"];

export default function UserGrowthChart({ data }: Props) {
    const [activePeriod, setActivePeriod] = useState("1Y");

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Growth</h3>
                    <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">New user signups over time</p>
                </div>
                <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-800">
                    {periods.map((p) => (
                        <button
                            key={p}
                            onClick={() => setActivePeriod(p)}
                            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${activePeriod === p ? "bg-white text-gray-900 shadow-sm dark:bg-gray-dark dark:text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"}`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6 h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" className="dark:opacity-20" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} className="text-xs text-gray-400" />
                        <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} className="text-xs text-gray-400" />
                        <Tooltip
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #E2E8F0",
                                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                            }}
                            labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                        />
                        <Line type="monotone" dataKey="users" stroke="#4653E9" strokeWidth={3} dot={{ r: 4, fill: "#4653E9", stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
