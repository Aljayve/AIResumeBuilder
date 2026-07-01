import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DataPoint {
    month: string;
    resumes: number;
}

interface Props {
    data: DataPoint[];
}

export default function ResumeCreationChart({ data }: Props) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resume Creations</h3>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Monthly resume build activity</p>
            </div>

            <div className="mt-6 h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" className="dark:opacity-20" vertical={false} />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #E2E8F0",
                                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                            }}
                            labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                            cursor={{ fill: "rgba(70, 83, 233, 0.06)" }}
                        />
                        <defs>
                            <linearGradient id="resumeGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#4653E9" stopOpacity={1} />
                                <stop offset="100%" stopColor="#4653E9" stopOpacity={0.3} />
                            </linearGradient>
                        </defs>
                        <Bar dataKey="resumes" fill="url(#resumeGradient)" radius={[4, 4, 0, 0]} maxBarSize={36} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
