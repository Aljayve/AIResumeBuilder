import { Bell } from "lucide-react";
import Toggle from "../ui/Toggle";

interface Props {
    notifications: {
        email: boolean;
        exports: boolean;
        atsUpdates: boolean;
        reminders: boolean;
    };
}

export default function NotificationSettingsCard({ notifications }: Props) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                    <Bell size={20} />
                </span>
                <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Manage your notification preferences</p>
                </div>
            </div>

            <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Receive email updates</p>
                    </div>
                    <Toggle label="" checked={notifications.email} onChange={() => {}} />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Resume Export Notifications</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Get notified when exports complete</p>
                    </div>
                    <Toggle label="" checked={notifications.exports} onChange={() => {}} />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">ATS Updates</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">ATS score change alerts</p>
                    </div>
                    <Toggle label="" checked={notifications.atsUpdates} onChange={() => {}} />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Interview Reminders</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Upcoming interview alerts</p>
                    </div>
                    <Toggle label="" checked={notifications.reminders} onChange={() => {}} />
                </div>
            </div>

            <div className="mt-5 flex justify-end border-t border-gray-100 pt-4 dark:border-gray-800">
                <button className="rounded-lg bg-brand-500 px-5 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors">Save Preferences</button>
            </div>
        </div>
    );
}
