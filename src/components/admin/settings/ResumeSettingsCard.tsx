import { useState } from "react";
import { FileText } from "lucide-react";
import Toggle from "../../ui/Toggle";

interface Props {
    maxResumesPerUser: number;
    defaultTemplate: string;
    enableATSScore: boolean;
    templates?: string[];
    onSave?: (data: { maxResumesPerUser: number; defaultTemplate: string; enableATSScore: boolean }) => void;
}

export default function ResumeSettingsCard({ maxResumesPerUser, defaultTemplate, enableATSScore, templates, onSave }: Props) {
    const [max, setMax] = useState(maxResumesPerUser);
    const [tmpl, setTmpl] = useState(defaultTemplate);
    const [ats, setAts] = useState(enableATSScore);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                    <FileText size={20} />
                </span>
                <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">Resume Settings</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Default resume configuration</p>
                </div>
            </div>

            <div className="mt-5 space-y-4">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Max Resumes Per User</label>
                    <input
                        type="number"
                        value={max}
                        onChange={(e) => setMax(Number(e.target.value))}
                        className="h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Default Template</label>
                    <select
                        value={tmpl}
                        onChange={(e) => setTmpl(e.target.value)}
                        className="h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:[color-scheme:dark]"
                    >
                        {templates?.map((t) => (
                            <option key={t} className="dark:bg-gray-800 dark:text-white">{t}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">ATS Score Check</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Auto-calculate ATS compatibility</p>
                    </div>
                    <Toggle label="" checked={ats} onChange={setAts} />
                </div>
            </div>

            <div className="mt-5 flex justify-end border-t border-gray-100 pt-4 dark:border-gray-800">
                <button onClick={() => onSave?.({ maxResumesPerUser: max, defaultTemplate: tmpl, enableATSScore: ats })} className="rounded-lg bg-brand-500 px-5 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors">Save Changes</button>
            </div>
        </div>
    );
}
