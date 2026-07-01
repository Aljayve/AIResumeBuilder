import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, LayoutTemplate, CheckCircle, XCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import TemplateStatusBadge from "./TemplateStatusBadge";
import TemplateActions from "./TemplateActions";

interface Template {
    id: string | number;
    name: string;
    category: string;
    status: string;
    atsFriendly: boolean;
    featured: boolean;
    usageCount: number;
}

interface Props {
    templates: Template[];
}

const PAGE_SIZES = [5, 10, 15, 20];

export default function TemplateTable({ templates }: Props) {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const totalPages = Math.max(1, Math.ceil(templates.length / pageSize));
    const safePage = Math.min(page, totalPages - 1);

    useEffect(() => {
        if (page >= totalPages) setPage(0);
    }, [totalPages, page]);

    const paginated = useMemo(
        () => templates.slice(safePage * pageSize, (safePage + 1) * pageSize),
        [templates, safePage, pageSize]
    );

    const startRow = safePage * pageSize + 1;
    const endRow = Math.min((safePage + 1) * pageSize, templates.length);

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-gray-800">
                        <TableRow>
                            <TableCell isHeader className="px-5 py-3.5 text-start text-theme-xs font-medium text-gray-500">Template</TableCell>
                            <TableCell isHeader className="px-5 py-3.5 text-start text-theme-xs font-medium text-gray-500">Category</TableCell>
                            <TableCell isHeader className="px-5 py-3.5 text-start text-theme-xs font-medium text-gray-500">Status</TableCell>
                            <TableCell isHeader className="px-5 py-3.5 text-start text-theme-xs font-medium text-gray-500">ATS Friendly</TableCell>
                            <TableCell isHeader className="px-5 py-3.5 text-start text-theme-xs font-medium text-gray-500">Featured</TableCell>
                            <TableCell isHeader className="px-5 py-3.5 text-start text-theme-xs font-medium text-gray-500">Usage</TableCell>
                            <TableCell isHeader className="px-5 py-3.5" />
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {paginated.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="px-5 py-12 text-center text-sm text-gray-400">
                                    No templates found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginated.map((tpl) => (
                                <TableRow key={tpl.id}>
                                    <TableCell className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                                                <LayoutTemplate size={20} />
                                            </span>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">{tpl.name}</p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell className="px-5 py-4">
                                        <Badge size="sm" color="primary" variant="light">{tpl.category}</Badge>
                                    </TableCell>

                                    <TableCell className="px-5 py-4">
                                        <TemplateStatusBadge status={tpl.status} />
                                    </TableCell>

                                    <TableCell className="px-5 py-4">
                                        {tpl.atsFriendly
                                            ? <span className="inline-flex items-center gap-1 text-sm text-success-600"><CheckCircle size={15} /> Yes</span>
                                            : <span className="inline-flex items-center gap-1 text-sm text-gray-400"><XCircle size={15} /> No</span>
                                        }
                                    </TableCell>

                                    <TableCell className="px-5 py-4">
                                        {tpl.featured
                                            ? <Badge size="sm" color="warning">Featured</Badge>
                                            : <span className="text-sm text-gray-400">—</span>
                                        }
                                    </TableCell>

                                    <TableCell className="px-5 py-4">
                                        <span className="text-sm text-gray-800 dark:text-white/90">{tpl.usageCount.toLocaleString()}</span>
                                    </TableCell>

                                    <TableCell className="px-5 py-4">
                                        <TemplateActions />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>Rows per page:</span>
                    <select
                        value={pageSize}
                        onChange={(e) => { setPageSize(Number(e.target.value)); setPage(0); }}
                        className="rounded-lg border border-gray-200 bg-transparent px-2 py-1 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:text-white/90"
                    >
                        {PAGE_SIZES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <span>
                        {templates.length > 0 ? `${startRow}–${endRow} of ${templates.length}` : "0 results"}
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={safePage === 0}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 dark:hover:bg-gray-800">
                        <ChevronLeft size={16} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button key={i} onClick={() => setPage(i)}
                            className={`flex h-8 min-w-[32px] items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors ${i === safePage ? "bg-brand-500 text-white" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={safePage === totalPages - 1}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 dark:hover:bg-gray-800">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
