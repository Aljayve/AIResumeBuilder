import { useEffect, useState } from "react";
import { Users, FileText, Download, Briefcase } from "lucide-react";
import AdminStatCard from "../../../components/admin/dashboard/AdminStatCard";
import LatestUsers from "../../../components/admin/dashboard/LatestUsers";
import RecentActivities from "../../../components/admin/dashboard/RecentActivities";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import PageMeta from "../../../components/common/PageMeta";
import { adminApi, type DashboardData } from "../../../api/admin.api";
import { useAuthStore } from "../../../store/authStore";

export default function AdminDashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthStore();

    useEffect(() => {
        adminApi.getDashboard()
            .then((res) => setData(res.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <PageMeta
                title="Admin Dashboard - ResumeAI"
                description="Admin panel for managing users and resumes."
            />
            <PageBreadcrumb pageTitle="Dashboard" />

            <div className="space-y-6">
                {/* Welcome */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Welcome back, {user?.firstName || "Admin"}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Here's what's happening with your platform today.</p>
                </div>

                {/* Stats */}
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <AdminStatCard
                        title="Total Users"
                        value={loading ? "..." : (data?.stats.totalUsers ?? 0).toLocaleString()}
                        icon={<Users size={22} />}
                    />
                    <AdminStatCard
                        title="Total Resumes"
                        value={loading ? "..." : (data?.stats.totalResumes ?? 0).toLocaleString()}
                        icon={<FileText size={22} />}
                    />
                    <AdminStatCard
                        title="Cover Letters"
                        value={loading ? "..." : (data?.stats.totalExports ?? 0).toLocaleString()}
                        icon={<Download size={22} />}
                    />
                    <AdminStatCard
                        title="ATS Analyzed"
                        value={loading ? "..." : (data?.stats.totalJobMatches ?? 0).toLocaleString()}
                        icon={<Briefcase size={22} />}
                    />
                </div>

                {/* Activity + Users */}
                <div className="grid gap-5 md:grid-cols-2">
                    <RecentActivities activities={data?.recentActivities ?? []} />
                    <LatestUsers users={data?.latestUsers ?? []} />
                </div>
            </div>
        </>
    );
}
