import { ChevronDown, ChevronUp, Trash2, GripVertical } from "lucide-react";

interface Props {
    title: string;
    expanded: boolean;
    length: number;
    index: number;
    clickHandler: () => void;
    onMoveUp?: (i: number) => void;
    onMoveDown?: (i: number) => void;
    onDelete?: (i: number) => void;
    children: React.ReactNode;
}

export default function MoveEditSection({
    title,
    expanded,
    length,
    index,
    clickHandler,
    onMoveUp,
    onMoveDown,
    onDelete,
    children,
}: Props) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-white/[0.03]">
            <button
                type="button"
                onClick={clickHandler}
                className="flex w-full items-center gap-3 px-4 py-3 text-left"
            >
                <GripVertical size={16} className="shrink-0 text-gray-400" />
                <span className="flex-1 text-sm font-medium text-gray-800 dark:text-white/90">{title}</span>
                <div className="flex items-center gap-1">
                    {onMoveUp && (
                        <button type="button" onClick={(e) => { e.stopPropagation(); onMoveUp(index); }} disabled={index === 0}
                            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30 dark:hover:bg-gray-800">
                            <ChevronUp size={16} />
                        </button>
                    )}
                    {onMoveDown && (
                        <button type="button" onClick={(e) => { e.stopPropagation(); onMoveDown(index); }} disabled={index === length - 1}
                            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30 dark:hover:bg-gray-800">
                            <ChevronDown size={16} />
                        </button>
                    )}
                    {onDelete && (
                        <button type="button" onClick={(e) => { e.stopPropagation(); onDelete(index); }}
                            className="rounded p-1 text-red-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10">
                            <Trash2 size={16} />
                        </button>
                    )}
                    <ChevronDown size={16} className={`text-gray-400 transition ${expanded ? "rotate-180" : ""}`} />
                </div>
            </button>
            {expanded && <div className="border-t border-gray-100 px-4 py-4 dark:border-gray-700">{children}</div>}
        </div>
    );
}
