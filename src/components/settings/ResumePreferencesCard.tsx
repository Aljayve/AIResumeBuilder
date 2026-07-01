import { FileText } from "lucide-react";
import Toggle from "../ui/Toggle";

interface Props {
    preferences: {
        defaultTemplate: string;
        exportFormat: string;
        autoSave: boolean;
        atsOptimization: boolean;
    };
}

export default function ResumePreferencesCard({ preferences }: Props) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                    <FileText size={20} />
                </span>
                <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">Resume Preferences</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Default resume settings</p>
                </div>
            </div>

            <div className="mt-5 space-y-4">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Default Template</label>
                    <select
                        defaultValue={preferences.defaultTemplate}
                        className="h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
                    >
                        <option>ATS Classic</option>
                        <option>Modern Professional</option>
                        <option>Creative Portfolio</option>
                        <option>Minimal Clean</option>
                    </select>
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Export Format</label>
                    <select
                        defaultValue={preferences.exportFormat}
                        className="h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
                    >
                        <option>PDF</option>
                        <option>DOCX</option>
                        <option>TXT</option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto Save</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Automatically save changes</p>
                    </div>
                    <Toggle label="" checked={preferences.autoSave} onChange={() => {}} />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">ATS Optimization</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Optimize for ATS parsing</p>
                    </div>
                    <Toggle label="" checked={preferences.atsOptimization} onChange={() => {}} />
                </div>
            </div>

            <div className="mt-5 flex justify-end border-t border-gray-100 pt-4 dark:border-gray-800">
                <button className="rounded-lg bg-brand-500 px-5 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors">Save Preferences</button>
            </div>
        </div>
    );
}
