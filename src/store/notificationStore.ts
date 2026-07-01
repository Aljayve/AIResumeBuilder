import { create } from "zustand";
import { toast } from "sonner";
import { notificationApi, type Notification } from "../api/notification.api";

const knownIds = new Set<string>();
let isFirstFetch = true;
let pollTimer: ReturnType<typeof setInterval> | null = null;

interface NotificationState {
    notifications: Notification[];
    unreadCount: number;
    loading: boolean;
    fetchNotifications: () => Promise<void>;
    markAsRead: (id: string) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    startPolling: () => void;
    stopPolling: () => void;
}

function showToast(n: Notification) {
    const label = n.title;
    const desc = n.message;
    switch (n.type) {
        case "success":
            toast.success(label, { description: desc });
            break;
        case "warning":
            toast.warning(label, { description: desc });
            break;
        case "error":
            toast.error(label, { description: desc });
            break;
        default:
            toast.info(label, { description: desc });
    }
}

export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],
    unreadCount: 0,
    loading: false,

    fetchNotifications: async () => {
        set({ loading: true });
        try {
            const [notifRes, countRes] = await Promise.all([
                notificationApi.getAll(),
                notificationApi.countUnread(),
            ]);

            const fetched = notifRes.data;

            if (!isFirstFetch) {
                for (const n of fetched) {
                    if (!knownIds.has(n._id)) {
                        showToast(n);
                    }
                }
            }
            isFirstFetch = false;

            for (const n of fetched) {
                knownIds.add(n._id);
            }

            set({
                notifications: fetched,
                unreadCount: countRes.data,
                loading: false,
            });
        } catch {
            set({ loading: false });
        }
    },

    startPolling: () => {
        if (pollTimer) return;
        pollTimer = setInterval(() => {
            useNotificationStore.getState().fetchNotifications();
        }, 30000);
    },

    stopPolling: () => {
        if (pollTimer) {
            clearInterval(pollTimer);
            pollTimer = null;
        }
    },

    markAsRead: async (id) => {
        await notificationApi.markAsRead(id);
        set((s) => ({
            notifications: s.notifications.map((n) =>
                n._id === id ? { ...n, read: true } : n,
            ),
            unreadCount: Math.max(0, s.unreadCount - 1),
        }));
    },

    markAllAsRead: async () => {
        await notificationApi.markAllAsRead();
        set((s) => ({
            notifications: s.notifications.map((n) => ({ ...n, read: true })),
            unreadCount: 0,
        }));
    },
}));
