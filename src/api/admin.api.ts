import api from "./axios";

export interface DashboardStats {
    totalUsers: number;
    totalResumes: number;
    totalExports: number;
    totalJobMatches: number;
}

export interface RecentActivity {
    id: string;
    action: string;
    user: string;
    date: string;
}

export interface LatestUser {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    joined: string;
}

export interface DashboardData {
    stats: DashboardStats;
    recentActivities: RecentActivity[];
    latestUsers: LatestUser[];
}

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    avatar?: string;
    resumes: number;
    exports: number;
    createdAt: string;
}

export interface AdminResume {
    id: string;
    title: string;
    owner: string;
    template: string;
    atsScore: number;
    status: string;
    createdAt: string;
}

export interface AdminTemplate {
    id: string;
    name: string;
    slug: string;
    category: string;
    status: string;
    atsFriendly: boolean;
    featured: boolean;
    usageCount: number;
}

export interface AnalyticsData {
    stats: {
        totalUsers: number;
        totalResumes: number;
        totalExports: number;
        totalJobMatches: number;
        visitorTrend: number;
        resumeTrend: number;
        exportTrend: number;
        atsTrend: number;
    };
    userGrowth: { month: string; users: number }[];
    resumeCreation: { month: string; resumes: number }[];
    templateUsage: { name: string; usage: number }[];
    topTemplates: { rank: number; name: string; usage: number; trend: number }[];
}

export interface AdminSettings {
    siteName: string;
    supportEmail: string;
    defaultLanguage: string;
    aiProvider: string;
    aiApiKey: string;
    aiEnabled: boolean;
    aiCustomBaseUrl: string;
    aiCustomModel: string;
    maxResumesPerUser: number;
    defaultTemplate: string;
    enableATSScore: boolean;
    maxFileSize: number;
    allowedFormats: string[];
    enableCompression: boolean;
    allowRegistration: boolean;
    requireEmailVerification: boolean;
    enableTwoFactor: boolean;
}

export const adminApi = {
    getDashboard: () => api.get<DashboardData>("/admin/dashboard"),
    getUsers: () => api.get<AdminUser[]>("/admin/users"),
    getResumes: () => api.get<AdminResume[]>("/admin/resumes"),
    getTemplates: () => api.get<AdminTemplate[]>("/admin/templates"),
    getAnalytics: () => api.get<AnalyticsData>("/admin/analytics"),
    getSettings: () => api.get<AdminSettings>("/admin/settings"),
    updateSettings: (dto: Partial<AdminSettings>) => api.patch<AdminSettings>("/admin/settings", dto),
};
