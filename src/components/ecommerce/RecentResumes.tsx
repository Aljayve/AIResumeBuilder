import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useDashboardStore } from "../../store/dashboardStore";
import { timeAgo } from "../../utils/timeAgo";

export default function RecentResumes() {
    const { resumes, loading } = useDashboardStore();

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Recent Resumes
                    </h3>
                </div>
                <div className="flex items-center gap-3">
                    <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                        See all
                    </button>
                </div>
            </div>
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                        <TableRow>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Resume
                            </TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Template
                            </TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Updated
                            </TableCell>
                            <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                ATS Score
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="py-8 text-center text-gray-500">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : resumes.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="py-8 text-center text-gray-500">
                                    No resumes yet
                                </TableCell>
                            </TableRow>
                        ) : (
                            resumes.map((resume) => (
                                <TableRow key={resume._id}>
                                    <TableCell className="py-3">
                                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {resume.title}
                                        </p>
                                    </TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        {resume.template}
                                    </TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        {timeAgo(resume.updatedAt)}
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <Badge
                                            size="sm"
                                            color={
                                                resume.atsScore >= 90
                                                    ? "success"
                                                    : resume.atsScore >= 80
                                                        ? "warning"
                                                        : "error"
                                            }
                                        >
                                            {resume.atsScore}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
