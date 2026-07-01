import { testimonials } from "../../../../constants/testimonials";
import TestimonialCard from "../../../../components/cards/TestimonialCard";

export default function TestimonialsSection() {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <span className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-600 dark:border-brand-800 dark:bg-brand-500/10 dark:text-brand-400">
                        Testimonials
                    </span>
                    <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Trusted By Job Seekers
                        <span className="text-brand-500"> Worldwide</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                        Thousands of professionals use ResumeAI to create stronger resumes and improve
                        their chances of getting hired.
                    </p>
                </div>

                <div className="mb-16 grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border border-gray-200 p-8 text-center dark:border-gray-800">
                        <h3 className="text-4xl font-bold text-brand-500">10k+</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Resumes Created</p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-8 text-center dark:border-gray-800">
                        <h3 className="text-4xl font-bold text-brand-500">95%</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">ATS Compatibility</p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-8 text-center dark:border-gray-800">
                        <h3 className="text-4xl font-bold text-brand-500">4.9/5</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">User Satisfaction</p>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <TestimonialCard key={testimonial.id} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
}
