import { useEffect, useState, useMemo, useCallback } from "react";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import TemplateGrid from "../../../components/templates/TemplateGrid";
import type { TemplateItem } from "../../../components/templates/TemplateGrid";
import TemplateToolbar from "../../../components/templates/TemplateToolbar";
import Pagination from "../../../components/ui/Pagination";
import { templateApi } from "../../../api/template.api";
import { useAuthStore } from "../../../store/authStore";

export default function TemplatesPage() {
    const plan = useAuthStore((s) => s.user?.plan);
    const [allTemplates, setAllTemplates] = useState<TemplateItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Categories");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);

    useEffect(() => {
        setLoading(true);
        templateApi.getAll(plan)
            .then((data) => {
                setAllTemplates(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [plan]);

    const filteredTemplates = useMemo(() => {
        let result = allTemplates;
        const q = search.toLowerCase().trim();
        if (q) {
            result = result.filter(
                (t) =>
                    t.title.toLowerCase().includes(q) ||
                    t.category.toLowerCase().includes(q)
            );
        }
        if (category !== "All Categories") {
            result = result.filter((t) => t.category === category);
        }
        return result;
    }, [search, category, allTemplates]);

    const totalPages = Math.ceil(filteredTemplates.length / pageSize);

    const paginatedTemplates = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredTemplates.slice(start, start + pageSize);
    }, [currentPage, pageSize, filteredTemplates]);

    const handlePageChange = useCallback((page: number) => setCurrentPage(page), []);
    const handlePageSizeChange = useCallback((size: number) => { setPageSize(size); setCurrentPage(1); }, []);
    const handleSearchChange = useCallback((value: string) => { setSearch(value); setCurrentPage(1); }, []);
    const handleCategoryChange = useCallback((value: string) => { setCategory(value); setCurrentPage(1); }, []);

    return (
        <>
            <PageMeta
                title="Resume Templates - ResumeAI"
                description="Choose a template for your resume."
            />
            <PageBreadcrumb pageTitle="Resume Templates" />

            <div className="space-y-6">
                <TemplateToolbar
                    search={search}
                    onSearchChange={handleSearchChange}
                    category={category}
                    onCategoryChange={handleCategoryChange}
                />

                {loading ? (
                    <div className="flex items-center justify-center py-20 text-gray-500 dark:text-gray-400">
                        <p>Loading templates...</p>
                    </div>
                ) : paginatedTemplates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400">
                        <p className="text-lg font-medium">No templates found</p>
                        <p className="text-sm">Try a different search or category.</p>
                    </div>
                ) : (
                    <TemplateGrid templates={paginatedTemplates} />
                )}

                {filteredTemplates.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={filteredTemplates.length}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                    />
                )}
            </div>
        </>
    )
}
