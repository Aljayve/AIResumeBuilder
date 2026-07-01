import { motion } from "framer-motion";

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ElementType;
}

export default function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
    return (
        <motion.div
            whileHover={{ y: -6 }}
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-white/[0.03]"
        >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                <Icon size={24} />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">{description}</p>
        </motion.div>
    );
}
