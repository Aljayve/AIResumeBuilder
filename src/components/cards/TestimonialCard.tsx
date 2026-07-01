interface TestimonialCardProps {
    name: string;
    role: string;
    company: string;
    review: string;
}

export default function TestimonialCard({ name, role, company, review }: TestimonialCardProps) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-6 text-4xl leading-none text-brand-500">"</div>
            <p className="leading-7 text-gray-600 dark:text-gray-300">{review}</p>
            <div className="mt-8">
                <h4 className="font-semibold text-gray-900 dark:text-white">{name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">{company}</p>
            </div>
        </div>
    );
}
