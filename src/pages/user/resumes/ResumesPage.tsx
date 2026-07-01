import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { Loader2, Plus } from "lucide-react";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import ResumeGrid from "../../../components/resume/ResumeGrid";
import ResumeToolbar from "../../../components/resume/ResumeToolbar";
import ResumeTable from "../../../components/resume/ResumeTable";
import Pagination from "../../../components/ui/Pagination";
import { resumeApi } from "../../../api/resume.api";
import type { ResumeSummary } from "../../../api/resume.api";

export default function ResumesPage() {
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<ResumeSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<"grid" | "table">("grid");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        resumeApi.getAll()
            .then(({ data }) => setResumes(data))
            .catch(() => setResumes([]))
            .finally(() => setLoading(false));
    }, []);

    const filteredResumes = useMemo(() => {
        if (!search.trim()) return resumes;
        const q = search.toLowerCase();
        return resumes.filter(
            (r) =>
                r.title.toLowerCase().includes(q) ||
                r.template.toLowerCase().includes(q)
        );
    }, [search, resumes]);

    const totalPages = Math.ceil(filteredResumes.length / pageSize);

    const paginatedResumes = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredResumes.slice(start, start + pageSize);
    }, [currentPage, pageSize, filteredResumes]);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const handlePageSizeChange = useCallback((size: number) => {
        setPageSize(size);
        setCurrentPage(1);
    }, []);

    const handleSearchChange = useCallback((value: string) => {
        setSearch(value);
        setCurrentPage(1);
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await resumeApi.delete(id);
            setResumes((prev) => prev.filter((r) => r._id !== id));
        } catch {
            // silently fail
        }
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin text-brand-500" />
            </div>
        );
    }

    return (
        <>
            <PageMeta
                title="My Resumes - ResumeAI"
                description="View and manage your uploaded resumes."
            />
            <PageBreadcrumb pageTitle="My Resumes" />

            <div className="space-y-6">
                <ResumeToolbar
                    view={view}
                    onViewChange={setView}
                    search={search}
                    onSearchChange={handleSearchChange}
                    onCreate={() => navigate("/dashboard/resumes/create")}
                />

                {resumes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
                        <p className="text-lg font-medium">No resumes yet</p>
                        <p className="text-sm">Create your first resume to get started.</p>
                        <button
                            onClick={() => navigate("/dashboard/resumes/create")}
                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
                        >
                            <Plus size={16} /> Create Resume
                        </button>
                    </div>
                ) : paginatedResumes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
                        <p className="text-lg font-medium">No resumes found</p>
                        <p className="text-sm">Try a different search term.</p>
                    </div>
                ) : view === "grid" ? (
                    <ResumeGrid resumes={paginatedResumes} onDelete={handleDelete} />
                ) : (
                    <ResumeTable resumes={paginatedResumes} onDelete={handleDelete} />
                )}

                {filteredResumes.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={filteredResumes.length}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                    />
                )}
            </div>
        </>
    )
}
