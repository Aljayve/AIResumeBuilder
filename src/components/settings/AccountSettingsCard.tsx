import { useState, useEffect } from "react";
import { Mail, CreditCard, Calendar, ArrowUpRight, FileText, FileEdit } from "lucide-react";
import { userApi, type UsageResponse } from "../../api/user.api";
import { PLANS, usagePercent } from "../../constants/plans";
import PlanUpgradeModal from "./PlanUpgradeModal";

interface Props {
    account: {
        email: string;
        plan: string;
        createdAt: string;
    };
}

export default function AccountSettingsCard({ account }: Props) {
    const [usage, setUsage] = useState<UsageResponse | null>(null);
    const [showUpgrade, setShowUpgrade] = useState(false);

    useEffect(() => {
        userApi.getUsage().then(r => setUsage(r.data)).catch(() => {});
    }, []);

    const planDef = PLANS[account.plan] ?? PLANS.free;
    const resumesPct = usage ? usagePercent(usage.usage.resumes, usage.limits.resumes) : 0;
    const lettersPct = usage ? usagePercent(usage.usage.coverLetters, usage.limits.coverLetters) : 0;

    return (
        <>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                        <CreditCard size={20} />
                    </span>
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">Account & Plan</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Your subscription and usage</p>
                    </div>
                </div>

                <div className="mt-5 space-y-4">
                    <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-white/[0.02]">
                        <Mail size={16} className="shrink-0 text-gray-400" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{account.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-white/[0.02]">
                        <CreditCard size={16} className="shrink-0 text-gray-400" />
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Plan</p>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{planDef.name}</p>
                                <span className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                                    ${planDef.price}/mo
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-white/[0.02]">
                        <Calendar size={16} className="shrink-0 text-gray-400" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Member Since</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{account.createdAt}</p>
                        </div>
                    </div>
                </div>

                {usage && (
                    <div className="mt-4 space-y-3">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Usage
                            {usage.usageResetAt && (
                                <span className="ml-2 text-gray-400 font-normal">
                                    (resets {new Date(usage.usageResetAt).toLocaleDateString()})
                                </span>
                            )}
                        </p>
                        <div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                    <FileText size={13} /> Resumes
                                </span>
                                <span className="text-gray-500">{usage.usage.resumes} / {usage.limits.resumes >= 999999 ? "∞" : usage.limits.resumes}</span>
                            </div>
                            <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                                <div className="h-1.5 rounded-full bg-brand-500 transition-all" style={{ width: `${resumesPct}%` }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                    <FileEdit size={13} /> Cover Letters
                                </span>
                                <span className="text-gray-500">{usage.usage.coverLetters} / {usage.limits.coverLetters >= 999999 ? "∞" : usage.limits.coverLetters}</span>
                            </div>
                            <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                                <div className="h-1.5 rounded-full bg-brand-500 transition-all" style={{ width: `${lettersPct}%` }} />
                            </div>
                        </div>
                    </div>
                )}

                {account.plan === "free" && (
                    <div className="mt-4">
                        <button
                            onClick={() => setShowUpgrade(true)}
                            className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
                        >
                            Upgrade Plan
                            <ArrowUpRight size={15} />
                        </button>
                    </div>
                )}
            </div>

            {showUpgrade && <PlanUpgradeModal onClose={() => setShowUpgrade(false)} />}
        </>
    );
}
