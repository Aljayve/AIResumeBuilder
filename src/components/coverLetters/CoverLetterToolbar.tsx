import { useRef, useState } from "react";
import { Copy, Download, FileText, FileDown } from "lucide-react";
import { toast } from "sonner";
import { coverLetterApi } from "../../api/coverLetter.api";
import { useCoverLetterStore } from "../../store/coverLetterStore";

interface Props {
    content: string;
}

export default function CoverLetterToolbar({ content }: Props) {
    const [dlOpen, setDlOpen] = useState(false);
    const [saveOpen, setSaveOpen] = useState(false);
    const dlRef = useRef<HTMLDivElement>(null);
    const saveRef = useRef<HTMLDivElement>(null);
    const current = useCoverLetterStore(s => s.current);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            toast.success("Copied to clipboard");
        } catch {
            toast.error("Failed to copy");
        }
    };

    const exportPdf = async () => {
        if (!current?._id) { toast.error("No cover letter to export"); return; }
        try {
            await coverLetterApi.exportPdf(current._id);
        } catch {
            toast.error("Failed to export PDF");
        }
    };

    const exportDocx = async () => {
        if (!current?._id) { toast.error("No cover letter to export"); return; }
        try {
            await coverLetterApi.exportDocx(current._id);
        } catch {
            toast.error("Failed to export DOCX");
        }
    };

    const savePdf = async () => {
        if (!current?._id) { toast.error("No cover letter to save"); return; }
        try {
            await coverLetterApi.exportPdf(current._id);
            toast.success("Saved as PDF");
        } catch {
            toast.error("Failed to save PDF");
        }
    };

    const saveDocx = async () => {
        if (!current?._id) { toast.error("No cover letter to save"); return; }
        try {
            await coverLetterApi.exportDocx(current._id);
            toast.success("Saved as DOCX");
        } catch {
            toast.error("Failed to save DOCX");
        }
    };

    const baseBtn = "inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const downloadMenu = (close: () => void) => (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[180px] rounded-xl border border-gray-200 bg-white py-1 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark">
            <button onClick={() => { exportPdf(); close(); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5">
                <FileText size={15} /> Download as PDF
            </button>
            <button onClick={() => { exportDocx(); close(); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5">
                <FileDown size={15} /> Download as DOCX
            </button>
        </div>
    );

    const saveMenu = (close: () => void) => (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[180px] rounded-xl border border-gray-200 bg-white py-1 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark">
            <button onClick={() => { savePdf(); close(); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5">
                <FileText size={15} /> Save as PDF
            </button>
            <button onClick={() => { saveDocx(); close(); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5">
                <FileDown size={15} /> Save as DOCX
            </button>
        </div>
    );

    return (
        <div className="flex flex-wrap gap-3">
            <button onClick={handleCopy} disabled={!content} className={baseBtn}>
                <Copy size={16} /> Copy
            </button>

            <div ref={dlRef} className="relative">
                <button
                    onClick={() => { setDlOpen(o => !o); setSaveOpen(false); }}
                    disabled={!content}
                    className="dropdown-toggle inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Download size={16} /> Download
                </button>
                {dlOpen && downloadMenu(() => setDlOpen(false))}
            </div>

            <div ref={saveRef} className="relative">
                <button
                    onClick={() => { setSaveOpen(o => !o); setDlOpen(false); }}
                    disabled={!content}
                    className="dropdown-toggle inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Download size={16} /> Save
                </button>
                {saveOpen && saveMenu(() => setSaveOpen(false))}
            </div>
        </div>
    );
}
