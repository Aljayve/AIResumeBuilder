import api from "./axios";

export interface Notification {
    _id: string;
    userId: string;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    read: boolean;
    createdAt: string;
    updatedAt: string;
}

export const notificationApi = {
    getAll: () => api.get<Notification[]>("/notifications"),
    countUnread: () => api.get<number>("/notifications/unread/count"),
    markAsRead: (id: string) => api.patch(`/notifications/${id}/read`),
    markAllAsRead: () => api.patch("/notifications/read-all"),
};
