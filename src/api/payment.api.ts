import api from "./axios";

export interface CheckoutResponse {
    checkoutUrl: string;
    sessionId: string;
}

export interface VerifyResponse {
    verified: boolean;
    plan: string;
}

export const paymentApi = {
    createCheckout: (planId: string) =>
        api.post<CheckoutResponse>("/payments/checkout", { planId }),

    verifyPayment: (sessionId: string) =>
        api.get<VerifyResponse>(`/payments/verify?session_id=${sessionId}`),
};
