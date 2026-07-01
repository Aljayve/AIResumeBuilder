import { useEffect, useState } from "react";
import { Eye, FileText, Download, TrendingUp } from "lucide-react";
import AnalyticsStats from "../../../components/admin/analytics/AnalyticsStats";
import UserGrowthChart from "../../../components/admin/analytics/UserGrowthChart";
import ResumeCreationChart from "../../../components/admin/analytics/ResumeCreationChart";
import TemplateUsageChart from "../../../components/admin/analytics/TemplateUsageChart";
import TopTemplatesTable from "../../../components/admin/analytics/TopTemplatesTable";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import PageMeta from "../../../components/common/PageMeta";
import { adminApi, type AnalyticsData } from "../../../api/admin.api";

export default function AnalyticsPage() {
    const [data, setData] = useState<AnalyticsData | null>(null);

    useEffect(() => {
        adminApi.getAnalytics().then((res) => setData(res.data));
    }, []);

    if (!data) {
        return (
            <div className="flex h-64 items-center justify-center">
                <p className="text-gray-500">Loading analytics...</p>
            </div>
        );
    }

    const stats = [
        {
            title: "Total Visitors",
            value: data.stats.totalUsers.toLocaleString(),
            icon: <Eye size={22} />,
            trend: data.stats.visitorTrend,
            trendLabel: "vs last month",
        },
        {
            title: "Active Users",
            value: data.stats.totalResumes.toLocaleString(),
            icon: <FileText size={22} />,
            trend: data.stats.resumeTrend,
            trendLabel: "vs last month",
        },
        {
            title: "Exports",
            value: data.stats.totalExports.toLocaleString(),
            icon: <Download size={22} />,
            trend: data.stats.exportTrend,
            trendLabel: "vs last month",
        },
        {
            title: "ATS Analyzed",
            value: data.stats.totalJobMatches.toLocaleString(),
            icon: <TrendingUp size={22} />,
            trend: data.stats.atsTrend,
            trendLabel: "vs last month",
        },
    ];

    return (
        <>
            <PageMeta
                title="Admin Analytics"
                description="Admin Analytics - ResumeAI"
            />
            <PageBreadcrumb pageTitle="Analytics" />

            <div className="space-y-6">
                <AnalyticsStats stats={stats} />

                <div className="grid gap-6 xl:grid-cols-2">
                    <UserGrowthChart data={data.userGrowth} />
                    <ResumeCreationChart data={data.resumeCreation} />
                </div>

                <div className="grid gap-6 xl:grid-cols-2">
                    <TemplateUsageChart data={data.templateUsage} />
                    <TopTemplatesTable templates={data.topTemplates} />
                </div>
            </div>
        </>
    );
}
