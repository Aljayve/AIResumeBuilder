import { useState } from "react";
import { Settings } from "lucide-react";

interface Props {
    siteName: string;
    supportEmail: string;
    defaultLanguage: string;
    onSave?: (data: { siteName: string; supportEmail: string; defaultLanguage: string }) => void;
}

export default function GeneralSettingsCard({ siteName, supportEmail, defaultLanguage, onSave }: Props) {
    const [name, setName] = useState(siteName);
    const [email, setEmail] = useState(supportEmail);
    const [lang, setLang] = useState(defaultLanguage);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                    <Settings size={20} />
                </span>
                <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">General Settings</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Basic platform configuration</p>
                </div>
            </div>

            <div className="mt-5 space-y-4">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Site Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Support Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Default Language</label>
                    <select
                        value={lang}
                        onChange={(e) => setLang(e.target.value)}
                        className="h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:[color-scheme:dark]"
                    >
                        <option className="dark:bg-gray-800 dark:text-white">English</option>
                        <option className="dark:bg-gray-800 dark:text-white">Spanish</option>
                        <option className="dark:bg-gray-800 dark:text-white">French</option>
                        <option className="dark:bg-gray-800 dark:text-white">German</option>
                    </select>
                </div>
            </div>

            <div className="mt-5 flex justify-end border-t border-gray-100 pt-4 dark:border-gray-800">
                <button onClick={() => onSave?.({ siteName: name, supportEmail: email, defaultLanguage: lang })} className="rounded-lg bg-brand-500 px-5 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors">Save Changes</button>
            </div>
        </div>
    );
}
