import { useEffect, useState } from "react";
import { ArrowRight, Eye } from "lucide-react";
import { Link } from "react-router";
import api from "../../../../api/axios";
import TemplatePreview from "../../../../components/templates/TemplatePreview";

interface Template {
    _id: string;
    title: string;
    slug: string;
    category: string;
    thumbnail: string;
    description: string;
}

export default function TemplatesSection() {
    const [templates, setTemplates] = useState<Template[]>([]);

    useEffect(() => {
        api.get<Template[]>("/templates").then((res) => {
            setTemplates(res.data.slice(0, 6));
        });
    }, []);

    if (templates.length === 0) return null;

    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <span className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-600 dark:border-brand-800 dark:bg-brand-500/10 dark:text-brand-400">
                        Resume Templates
                    </span>
                    <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Professional Templates
                        <span className="text-brand-500"> Designed To Pass ATS</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                        Choose from modern, recruiter-approved, and ATS-friendly resume templates.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {templates.map((template) => (
                        <div
                            key={template._id}
                            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-white/[0.03]"
                        >
                            <div className="relative h-80 bg-gray-50 dark:bg-white/[0.02]">
                                <div className="mx-auto h-full w-[180px] overflow-hidden py-4">
                                    <TemplatePreview slug={template.slug} title={template.title} />
                                </div>
                                <div className="absolute right-4 top-4">
                                    <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-medium text-white">{template.category}</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{template.title}</h3>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{template.description}</p>
                                <div className="mt-5 flex items-center justify-between">
                                    <Link to="/auth" className="flex items-center gap-2 text-sm font-medium text-brand-500 hover:text-brand-600">
                                        <Eye size={16} /> Preview
                                    </Link>
                                    <Link to="/auth" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand-500 dark:text-gray-300">
                                        Use Template <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
