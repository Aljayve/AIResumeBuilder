import FeatureCard from "../../../../components/cards/FeatureCard";
import { features } from "../../../../constants/features";

export default function FeaturesSection() {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <span className="inline-block rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-600 dark:border-brand-800 dark:bg-brand-500/10 dark:text-brand-400">
                        Powerful Features
                    </span>
                    <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Everything You Need To Build
                        <span className="text-brand-500"> A Winning Resume</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                        Create, optimize, analyze, and export professional resumes with AI-powered tools.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} title={feature.title} description={feature.description} icon={feature.icon} />
                    ))}
                </div>
            </div>
        </section>
    );
}
