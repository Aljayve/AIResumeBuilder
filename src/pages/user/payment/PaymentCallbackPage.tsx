import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuthStore } from "../../../store/authStore";
import { paymentApi } from "../../../api/payment.api";
import PageMeta from "../../../components/common/PageMeta";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function PaymentCallbackPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const fetchUser = useAuthStore(s => s.fetchUser);
    const status = searchParams.get("status");
    const sessionId = searchParams.get("session_id");
    const [verifying, setVerifying] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (status === "cancel") {
            setVerifying(false);
            setSuccess(false);
            return;
        }

        if (sessionId) {
            paymentApi.verifyPayment(sessionId)
                .then(({ data }) => {
                    setSuccess(data.verified);
                    setVerifying(false);
                    if (data.verified) {
                        fetchUser();
                    }
                })
                .catch(() => {
                    setSuccess(false);
                    setVerifying(false);
                });
        } else {
            setVerifying(false);
        }
    }, []);

    return (
        <>
            <PageMeta title="Payment - ResumeAI" description="Payment status" />

            <div className="flex flex-col items-center justify-center py-20">
                {verifying ? (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 size={48} className="animate-spin text-brand-500" />
                        <p className="text-gray-600 dark:text-gray-400">Verifying payment...</p>
                    </div>
                ) : success ? (
                    <div className="flex flex-col items-center gap-4">
                        <CheckCircle size={64} className="text-success-500" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Successful!</h2>
                        <p className="text-gray-500 dark:text-gray-400">Your plan has been upgraded.</p>
                        <button
                            onClick={() => navigate("/dashboard/settings")}
                            className="mt-4 rounded-lg bg-brand-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
                        >
                            Back to Settings
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <XCircle size={64} className="text-error-500" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {status === "cancel" ? "Payment Cancelled" : "Payment Failed"}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            {status === "cancel"
                                ? "You cancelled the payment. No charges were made."
                                : "We couldn't verify your payment. Please try again."}
                        </p>
                        <button
                            onClick={() => navigate("/dashboard/settings")}
                            className="mt-4 rounded-lg bg-brand-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
                        >
                            Back to Settings
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
