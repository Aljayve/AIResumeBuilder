import { FileText } from "lucide-react";
import Badge from "../ui/badge/Badge";
import ResumeActionsMenu from "./ResumeActionsMenu";
import { timeAgo } from "../../utils/timeAgo";

interface Props {
    _id: string;
    title: string;
    template: string;
    atsScore: number;
    updatedAt: string;
    onDelete?: (id: string) => void;
}

export default function ResumeCard({
    _id,
    title,
    template,
    atsScore,
    updatedAt,
    onDelete,
}: Props) {
    const badgeColor = atsScore >= 90 ? "success" : atsScore >= 80 ? "warning" : "error";

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="m-5 mb-0 flex h-48 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                <FileText size={48} className="text-gray-400 dark:text-gray-500" />
            </div>

            <div className="p-5">
                <div className="mb-4 flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white/90">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {template}
                        </p>
                    </div>
                    <ResumeActionsMenu resumeId={_id} resumeTitle={title} onDelete={onDelete} />
                </div>

                <div className="flex items-center justify-between">
                    <Badge size="sm" color={badgeColor}>
                        ATS {atsScore}
                    </Badge>
                    <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                        {timeAgo(updatedAt)}
                    </span>
                </div>
            </div>
        </div>
    );
}
