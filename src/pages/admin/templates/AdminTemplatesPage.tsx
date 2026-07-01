import { useEffect, useMemo, useState } from "react";
import { LayoutTemplate, CheckCircle, XCircle, Star } from "lucide-react";

import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";

import TemplateStats from "../../../components/admin/templates/TemplateStats";
import TemplateToolbar from "../../../components/admin/templates/TemplateToolbar";
import TemplateTable from "../../../components/admin/templates/TemplateTable";

import { adminApi, type AdminTemplate } from "../../../api/admin.api";

export default function AdminTemplatesPage() {
    const [allTemplates, setAllTemplates] = useState<AdminTemplate[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");

    useEffect(() => {
        adminApi.getTemplates()
            .then((res) => setAllTemplates(res.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const categories = useMemo(
        () => [...new Set(allTemplates.map((t) => t.category))],
        [allTemplates]
    );

    const filtered = useMemo(() => {
        return allTemplates.filter((tpl) => {
            const matchesSearch =
                !search.trim() ||
                tpl.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = categoryFilter === "all" || tpl.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [search, categoryFilter, allTemplates]);

    const active = allTemplates.filter((t) => t.status === "active").length;
    const inactive = allTemplates.filter((t) => t.status === "inactive").length;
    const featured = allTemplates.filter((t) => t.featured).length;

    if (loading) {
        return (
            <>
                <PageMeta title="Template Management" description="Manage resume templates" />
                <PageBreadcrumb pageTitle="Templates" />
                <p className="text-gray-500 dark:text-gray-400">Loading templates...</p>
            </>
        );
    }

    return (
        <>
            <PageMeta title="Template Management" description="Manage resume templates" />
            <PageBreadcrumb pageTitle="Templates" />

            <div className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <TemplateStats title="Total Templates" value={allTemplates.length} icon={<LayoutTemplate size={22} />} color="brand" />
                    <TemplateStats title="Active" value={active} icon={<CheckCircle size={22} />} color="success" />
                    <TemplateStats title="Inactive" value={inactive} icon={<XCircle size={22} />} color="error" />
                    <TemplateStats title="Featured" value={featured} icon={<Star size={22} />} color="warning" />
                </div>

                <TemplateToolbar
                    search={search}
                    onSearchChange={setSearch}
                    categoryFilter={categoryFilter}
                    onCategoryFilterChange={setCategoryFilter}
                    categories={categories}
                />

                <TemplateTable templates={filtered} />
            </div>
        </>
    );
}
