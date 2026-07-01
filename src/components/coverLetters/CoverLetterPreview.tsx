import { Eye } from "lucide-react";

interface Props {
    content: string;
}

export default function CoverLetterPreview({ content }: Props) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/[0.03]">
                    <Eye size={20} className="text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white/90">
                    Cover Letter Preview
                </h3>
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="whitespace-pre-line text-sm leading-7 text-gray-700 dark:text-gray-300">
                    {content}
                </div>
            </div>
        </div>
    );
}
