import { useState } from "react";
import { Shield, Lock, LogOut, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import Toggle from "../ui/Toggle";
import { authApi } from "../../api/auth.api";

export default function SecuritySettingsCard() {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [changing, setChanging] = useState(false);

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        setChanging(true);
        try {
            await authApi.changePassword({ currentPassword, newPassword });
            toast.success("Password changed successfully");
            setShowPasswordModal(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to change password");
        } finally {
            setChanging(false);
        }
    };

    return (
        <>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                        <Shield size={20} />
                    </span>
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">Security</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Password and authentication</p>
                    </div>
                </div>

                <div className="mt-5 space-y-3">
                    <button
                        onClick={() => setShowPasswordModal(true)}
                        className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5 transition-colors"
                    >
                        <Lock size={16} className="text-gray-400" />
                        <span className="flex-1 text-left">Change Password</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
                            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <Shield size={16} className="text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Two-Factor Auth</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Add extra security</p>
                            </div>
                        </div>
                        <Toggle label="" checked={false} onChange={() => {}} />
                    </div>

                    <button className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5 transition-colors">
                        <LogOut size={16} className="text-gray-400" />
                        <span className="flex-1 text-left">Logout All Devices</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
                            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <button className="flex w-full items-center gap-3 rounded-xl border border-red-200 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/20 transition-colors">
                        <Trash2 size={16} />
                        <span className="flex-1 text-left">Delete Account</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-red-400">
                            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {showPasswordModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h3>
                            <button onClick={() => setShowPasswordModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowPasswordModal(false)}
                                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleChangePassword}
                                disabled={changing}
                                className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50"
                            >
                                {changing ? "Changing..." : "Change Password"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
