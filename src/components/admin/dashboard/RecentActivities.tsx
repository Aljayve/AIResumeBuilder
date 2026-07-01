import { Clock } from "lucide-react";

interface Activity {
    id: string | number;
    action: string;
    user: string;
    date: string;
}

interface Props {
    activities: Activity[];
}

const actionColors: Record<string, string> = {
    "New Resume Created": "bg-brand-500",
    "Resume Exported": "bg-success-500",
    "Job Match Generated": "bg-warning-500",
};

function getDotColor(action: string) {
    return actionColors[action] || "bg-gray-400";
}

export default function RecentActivities({ activities }: Props) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Recent Activities</h3>
                <span className="text-sm text-brand-500 cursor-pointer hover:underline">View All</span>
            </div>

            <div className="relative space-y-0">
                {activities.map((item, i) => (
                    <div key={item.id} className="relative flex gap-4 pb-5 last:pb-0">
                        {i < activities.length - 1 && (
                            <span className="absolute left-[11px] top-5 h-full w-px bg-gray-200 dark:bg-gray-700" />
                        )}
                        <span className={`relative mt-1.5 flex h-2.5 w-2.5 shrink-0 rounded-full ${getDotColor(item.action)}`} />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90">{item.action}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.user}</p>
                            <span className="inline-flex items-center gap-1 mt-1 text-xs text-gray-400 dark:text-gray-500">
                                <Clock size={12} />
                                {item.date}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
