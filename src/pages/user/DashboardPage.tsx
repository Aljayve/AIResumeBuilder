import { useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import AtsScoreChart from "../../components/ecommerce/AtsScoreChart";
import ResumeStatisticsChart from "../../components/ecommerce/ResumeStatisticsChart";
import AtsTargetCard from "../../components/ecommerce/AtsTargetCard";
import RecentResumes from "../../components/ecommerce/RecentResumes";
import { useDashboardStore } from "../../store/dashboardStore";

export default function DashboardPage() {
    const { resumes, loading, fetchResumes } = useDashboardStore();

    useEffect(() => {
        fetchResumes();
    }, [fetchResumes]);

    const totalResumes = resumes.length;
    const avgAts = totalResumes
        ? Math.round(resumes.reduce((s, r) => s + r.atsScore, 0) / totalResumes)
        : 0;
    const optimized = resumes.filter((r) => r.atsScore >= 80).length;

    return (
        <>
            <PageMeta
                title="Dashboard - ResumeAI"
                description="Overview of your resumes, ATS scores, and performance metrics."
            />
            <PageBreadcrumb pageTitle="Dashboard" />
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-7">
                    <EcommerceMetrics
                        totalResumes={totalResumes}
                        avgAts={avgAts}
                        optimized={optimized}
                        loading={loading}
                    />
                    <AtsScoreChart />
                </div>

                <div className="col-span-12 xl:col-span-5">
                    <AtsTargetCard avgAts={avgAts} />
                </div>

                <div className="col-span-12">
                    <ResumeStatisticsChart />
                </div>

                <div className="col-span-12">
                    <RecentResumes />
                </div>
            </div>
        </>
    );
}
