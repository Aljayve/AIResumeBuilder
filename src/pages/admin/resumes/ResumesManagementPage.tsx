import { useEffect, useMemo, useState } from "react";
import { FileText, Globe, FileEdit, BarChart3 } from "lucide-react";

import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";

import ResumeManagementStats from "../../../components/admin/resumes/ResumeManagementStats";
import ResumeManagementToolbar from "../../../components/admin/resumes/ResumeManagementToolbar";
import ResumeManagementTable from "../../../components/admin/resumes/ResumeManagementTable";

import { adminApi, type AdminResume } from "../../../api/admin.api";

function toLocalDate(iso: string) {
    if (!iso) return "-";
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function ResumesManagementPage() {
    const [allResumes, setAllResumes] = useState<AdminResume[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        adminApi.getResumes()
            .then((res) => setAllResumes(res.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const filteredResumes = useMemo(() => {
        return allResumes.filter((resume) => {
            const matchesSearch =
                !search.trim() ||
                resume.title.toLowerCase().includes(search.toLowerCase()) ||
                resume.owner.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === "all" || resume.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [search, statusFilter, allResumes]);

    const resumesForTable = useMemo(() =>
        filteredResumes.map((r) => ({
            ...r,
            createdAt: toLocalDate(r.createdAt),
        })),
        [filteredResumes]
    );

    const published = allResumes.filter((r) => r.status === "published").length;
    const drafts = allResumes.filter((r) => r.status === "draft" || r.status === "archived").length;
    const avgAts = allResumes.length
        ? Math.round(allResumes.reduce((sum, r) => sum + r.atsScore, 0) / allResumes.length)
        : 0;

    if (loading) {
        return (
            <>
                <PageMeta title="Resume Management" description="Manage all resumes" />
                <PageBreadcrumb pageTitle="Resume Management" />
                <p className="text-gray-500 dark:text-gray-400">Loading resumes...</p>
            </>
        );
    }

    return (
        <>
            <PageMeta title="Resume Management" description="Manage all resumes" />
            <PageBreadcrumb pageTitle="Resume Management" />

            <div className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <ResumeManagementStats title="Total Resumes" value={allResumes.length} icon={<FileText size={22} />} color="brand" />
                    <ResumeManagementStats title="Published" value={published} icon={<Globe size={22} />} color="success" />
                    <ResumeManagementStats title="Drafts" value={drafts} icon={<FileEdit size={22} />} color="warning" />
                    <ResumeManagementStats title="Average ATS" value={avgAts} icon={<BarChart3 size={22} />} color="error" />
                </div>

                <ResumeManagementToolbar
                    search={search}
                    onSearchChange={setSearch}
                    statusFilter={statusFilter}
                    onStatusFilterChange={setStatusFilter}
                />

                <ResumeManagementTable resumes={resumesForTable} />
            </div>
        </>
    );
}
