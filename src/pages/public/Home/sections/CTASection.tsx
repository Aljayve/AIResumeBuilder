import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function CTASection() {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-900 px-8 py-20 text-center shadow-lg dark:bg-gray-dark">
                    <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />

                    <div className="relative mx-auto max-w-3xl">
                        <span className="inline-flex rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-400">
                            Start For Free
                        </span>

                        <h2 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
                            Build A Resume That
                            <span className="text-brand-400"> Gets More Interviews</span>
                        </h2>

                        <p className="mt-6 text-lg text-gray-400">
                            Create professional ATS-friendly resumes, optimize them with AI, and stand out from other applicants.
                        </p>

                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                to="/auth"
                                className="flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
                            >
                                Get Started Free
                                <ArrowRight size={16} />
                            </Link>
                            <button className="rounded-xl border border-gray-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800">
                                Browse Templates
                            </button>
                        </div>

                        <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
                            <span>✓ ATS Friendly</span>
                            <span>✓ AI Powered</span>
                            <span>✓ Export PDF</span>
                            <span>✓ Multiple Templates</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
