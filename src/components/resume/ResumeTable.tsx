import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { FileText } from "lucide-react";
import ResumeActionsMenu from "./ResumeActionsMenu";
import { timeAgo } from "../../utils/timeAgo";

interface Resume {
  _id: string;
  title: string;
  template: string;
  atsScore: number;
  updatedAt: string;
}

interface Props {
  resumes: Resume[];
  onDelete?: (id: string) => void;
}

export default function ResumeTable({ resumes, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3.5 px-4 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Resume
              </TableCell>
              <TableCell isHeader className="py-3.5 px-4 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Template
              </TableCell>
              <TableCell isHeader className="py-3.5 px-4 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                ATS Score
              </TableCell>
              <TableCell isHeader className="py-3.5 px-4 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Updated
              </TableCell>
              <TableCell isHeader className="py-3.5 px-4 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                <span className="sr-only">Actions</span>
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {resumes.map((resume) => (
              <TableRow key={resume._id}>
                <TableCell className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800">
                      <FileText size={18} className="text-gray-500 dark:text-gray-400" />
                    </div>
                    <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {resume.title}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3.5 text-gray-500 text-theme-sm dark:text-gray-400">
                  {resume.template}
                </TableCell>
                <TableCell className="px-4 py-3.5">
                  <Badge
                    size="sm"
                    color={resume.atsScore >= 90 ? "success" : resume.atsScore >= 80 ? "warning" : "error"}
                  >
                    {resume.atsScore}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3.5 text-gray-500 text-theme-sm dark:text-gray-400">
                  {timeAgo(resume.updatedAt)}
                </TableCell>
                <TableCell className="px-4 py-3.5">
                  <ResumeActionsMenu resumeId={resume._id} resumeTitle={resume.title} onDelete={onDelete} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
