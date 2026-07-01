import { howItWorks } from "../../../../constants/howItWorks";

export default function HowItWorksSections() {
    return (
        <section className="bg-gray-50 py-20 dark:bg-white/[0.01]">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-20 max-w-3xl text-center">
                    <span className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-600 dark:border-brand-800 dark:bg-brand-500/10 dark:text-brand-400">
                        How It Works
                    </span>
                    <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Create A Professional Resume
                        <span className="text-brand-500"> In Minutes</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                        A simple workflow designed to help you build stronger resumes and improve your chances of getting interviews.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {howItWorks.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.step}
                                className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-white/[0.03]"
                            >
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                                        <Icon size={28} />
                                    </div>
                                    <span className="text-4xl font-bold text-gray-200 dark:text-gray-700">{item.step}</span>
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                                <p className="text-sm leading-7 text-gray-500 dark:text-gray-400">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
