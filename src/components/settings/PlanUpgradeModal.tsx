import { useState } from "react";
import { X, Check, Loader2 } from "lucide-react";
import { PLANS, PLAN_ORDER } from "../../constants/plans";
import { useAuthStore } from "../../store/authStore";
import { paymentApi } from "../../api/payment.api";

interface Props {
    onClose: () => void;
}

export default function PlanUpgradeModal({ onClose }: Props) {
    const user = useAuthStore(s => s.user);
    const currentPlan = user?.plan ?? "free";
    const [loading, setLoading] = useState<string | null>(null);
    const [error, setError] = useState("");

    const handlePlanClick = async (planId: string) => {
        if (planId === "free" || planId === currentPlan) return;
        setLoading(planId);
        setError("");
        try {
            const { data } = await paymentApi.createCheckout(planId);
            window.location.href = data.checkoutUrl;
        } catch (e: any) {
            setError(e?.response?.data?.message ?? "Failed to start checkout. Please try again.");
            setLoading(null);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
            <div
                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-gray-100 p-4 dark:border-gray-800">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Choose Your Plan</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={20} />
                    </button>
                </div>

                <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
                    {PLAN_ORDER.map((id) => {
                        const plan = PLANS[id];
                        const isCurrent = currentPlan === id;
                        const isProcessing = loading === id;

                        return (
                            <div
                                key={id}
                                className={`rounded-xl border p-4 sm:p-5 flex flex-col ${isCurrent ? "border-brand-500 ring-2 ring-brand-500/20" : "border-gray-200 dark:border-gray-700"}`}
                            >
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{plan.name}</h4>
                                <p className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                                    ${plan.price}
                                    <span className="text-sm font-normal text-gray-500">/mo</span>
                                </p>

                                <ul className="mt-4 flex-1 space-y-2.5">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Check size={16} className="mt-0.5 shrink-0 text-brand-500" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    disabled={isCurrent || isProcessing}
                                    onClick={() => handlePlanClick(id)}
                                    className={`mt-6 w-full rounded-lg py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                                        isCurrent
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800"
                                            : "bg-brand-500 text-white hover:bg-brand-600"
                                    }`}
                                >
                                    {isProcessing ? (
                                        <><Loader2 size={16} className="animate-spin" /> Redirecting...</>
                                    ) : (
                                        isCurrent ? "Current Plan" : "Upgrade"
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {error && (
                    <p className="px-4 pb-2 text-sm text-error-500">{error}</p>
                )}

                <p className="px-4 pb-4 text-xs text-gray-400 dark:text-gray-500">
                    Enterprise plan includes AI auto-arrange for resumes and cover letters based on job descriptions.
                </p>
            </div>
        </div>
    );
}
