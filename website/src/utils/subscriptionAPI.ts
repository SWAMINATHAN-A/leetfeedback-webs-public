// Subscription API utilities for Razorpay Subscriptions
import { getCookie } from "./backendAuth";

const API_BASE_URL = "/api";

export interface SubscriptionResponse {
    subscriptionId: string;
    shortUrl: string;
}

export interface SubscriptionStatus {
    isSubscriptionActive: boolean;
}

/**
 * Create a new Razorpay subscription for the current user
 */
export async function createSubscription(): Promise<SubscriptionResponse | null> {
    try {
        const token = getCookie("auth_token");
        if (!token) {
            console.error("Not authenticated");
            return null;
        }

        const response = await fetch(`${API_BASE_URL}/subscription/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Create subscription error:", error);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Create subscription error:", error);
        return null;
    }
}

/**
 * Get current user's subscription status
 */
export async function getSubscriptionStatus(): Promise<SubscriptionStatus | null> {
    try {
        const token = getCookie("auth_token");
        if (!token) return null;

        const response = await fetch(`${API_BASE_URL}/subscription/status`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });

        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Get subscription status error:", error);
        return null;
    }
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

/**
 * Open Razorpay checkout for subscription
 * @param subscriptionId - Razorpay subscription ID from createSubscription()
 * @param onSuccess - Callback when payment succeeds
 * @param onFailure - Callback when payment fails
 */
export function openRazorpayCheckout(
    subscriptionId: string,
    userEmail: string | null,
    userName: string | null,
    onSuccess: () => void,
    onFailure: (error: any) => void
) {
    const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!razorpayKeyId) {
        console.error("VITE_RAZORPAY_KEY_ID not configured");
        onFailure(new Error("Payment not configured"));
        return;
    }

    if (!window.Razorpay) {
        console.error("Razorpay SDK not loaded");
        onFailure(new Error("Payment SDK not loaded"));
        return;
    }

    const options = {
        key: razorpayKeyId,
        subscription_id: subscriptionId,
        name: "Traverse",
        description: "Premium Monthly Subscription",
        handler: function (response: any) {
            console.log("Payment successful:", response);
            // Webhook will handle activation, but we can optimistically update UI
            onSuccess();
        },
        prefill: {
            email: userEmail || "",
            name: userName || "",
        },
        theme: {
            color: "#6366f1", // Indigo
        },
        modal: {
            ondismiss: function () {
                console.log("Payment modal closed");
            },
        },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        onFailure(response.error);
    });
    rzp.open();
}
