import { motion } from "framer-motion";
import { ArrowRight, ChartArea, CheckCircle, Sparkles, Zap } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden">
            <div>
                <div className="absolute -top-40 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
                <div className="absolute bottom-0 right-0 h-100 w-100 rounded-full bg-brand-500/10 blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-7xl items-center gap-12 px-6 py-28 md:grid-cols-2">
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-600 dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-300"
                    >
                        <Sparkles size={16} />
                        AI-Powered Resume Builder for Modern Careers
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl dark:text-white"
                    >
                        Build ATS-Friendly Resumes That Get You
                        <span className="text-brand-500"> Hired Faster</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-lg text-gray-500 dark:text-gray-400"
                    >
                        Create, optimize, and analyze your resume using AI.
                        Match job descriptions, improve ATS score, and export in seconds.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 flex flex-wrap items-center gap-4"
                    >
                        <button className="flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600 transition-colors">
                            Get Started
                            <ArrowRight size={16} />
                        </button>
                        <button className="cursor-pointer rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-brand-500 hover:text-white dark:border-gray-600 dark:text-gray-300 transition-colors">
                            View Templates
                        </button>
                    </motion.div>

                    <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-success-500" /> 95% ATS Compatibility
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-success-500" /> 10,000+ Resumes Created
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-success-500" /> AI Optimization Included
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                >
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-dark">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">John Doe</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Frontend Developer</p>
                            </div>
                            <div className="rounded-lg bg-success-50 px-3 py-1 text-xs font-semibold text-success-600 dark:bg-success-500/10 dark:text-success-400">
                                ATS 92
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Skills</p>
                            <div className="flex flex-wrap gap-2">
                                {["React", "TypeScript", "Node.js", "MongoDB"].map((skill) => (
                                    <span key={skill} className="rounded-lg bg-gray-100 px-2 py-1 text-xs dark:bg-white/[0.05]">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Experience</p>
                            <div className="text-xs text-gray-700 dark:text-gray-300">
                                Built scalable web applications using React and Node.js improving performance by 40%.
                            </div>
                        </div>
                    </div>

                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="absolute -left-6 top-10 rounded-xl border bg-white p-3 text-xs shadow-lg dark:border-gray-700 dark:bg-gray-dark">
                            <Zap size={18} className="inline-flex text-brand-500" /> AI Optimized
                        </div>
                        <div className="absolute -bottom-6 right-10 rounded-xl border bg-white p-3 text-xs shadow-lg dark:border-gray-700 dark:bg-gray-dark">
                            <ChartArea size={18} className="inline-flex text-success-500" /> ATS Score +92
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
