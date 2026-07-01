interface Template {
    rank: number;
    name: string;
    usage: number;
    trend: number;
}

interface Props {
    templates: Template[];
}

export default function TopTemplatesTable({ templates }: Props) {
    const maxUsage = Math.max(...templates.map((t) => t.usage));

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Templates</h3>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Most used resume templates</p>
            </div>

            <div className="mt-5 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                            <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">#</th>
                            <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">Template</th>
                            <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">Usage</th>
                            <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">Trend</th>
                        </tr>
                    </thead>
                    <tbody>
                        {templates.map((t) => (
                            <tr key={t.rank} className="border-b border-gray-50 last:border-0 dark:border-gray-800/50">
                                <td className="py-3.5 text-gray-400">{t.rank}</td>
                                <td className="py-3.5">
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium text-gray-900 dark:text-white">{t.name}</span>
                                        <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700 sm:block">
                                            <div
                                                className="h-full rounded-full bg-brand-500"
                                                style={{ width: `${(t.usage / maxUsage) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3.5 text-right font-medium text-gray-900 dark:text-white">{t.usage.toLocaleString()}</td>
                                <td className="py-3.5 text-right">
                                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${t.trend >= 0 ? "bg-success-50 text-success-600 dark:bg-success-500/10" : "bg-error-50 text-error-600 dark:bg-error-500/10"}`}>
                                        <svg className="fill-current" width="8" height="8" viewBox="0 0 10 10">
                                            {t.trend >= 0 ? (
                                                <path d="M5 1.5L9.5 8H0.5L5 1.5Z" />
                                            ) : (
                                                <path d="M5 8.5L0.5 2H9.5L5 8.5Z" />
                                            )}
                                        </svg>
                                        {Math.abs(t.trend)}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
