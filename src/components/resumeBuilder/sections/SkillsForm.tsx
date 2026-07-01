import { useState, useCallback } from "react";
import { useResumeBuilderStore } from "../../../store/resumeBuilderStore";
import { Wrench, X } from "lucide-react";
import Input from "../../ui/Input";
import Slider from "../../ui/Slider";

interface SkillItem {
    name: string;
    level: number;
}

type CategorizedSkills = Record<string, SkillItem[]>;

const categoryLabels: Record<string, string> = {
    languages: "Languages",
    frameworks: "Frameworks",
    technologies: "Technologies",
    libraries: "Libraries",
    databases: "Databases",
    tools: "Tools",
    practices: "Practices",
};

const categories = Object.keys(categoryLabels);

function SkillCategory({
    category,
    items,
    onAdd,
    onRemove,
    onEdit,
}: {
    category: string;
    items: SkillItem[];
    onAdd: (cat: string, name: string, level: number) => void;
    onRemove: (cat: string, index: number) => void;
    onEdit: (cat: string, index: number, name: string, level: number) => void;
}) {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [level, setLevel] = useState(0);
    const [editIdx, setEditIdx] = useState<number | null>(null);

    const handleDone = () => {
        const trimmed = name.trim();
        if (!trimmed) return;
        if (editIdx !== null) {
            onEdit(category, editIdx, trimmed, level);
            setEditIdx(null);
        } else {
            onAdd(category, trimmed, level);
        }
        setName("");
        setLevel(0);
        setShowForm(false);
    };

    const startEdit = (idx: number) => {
        setEditIdx(idx);
        setName(items[idx].name);
        setLevel(items[idx].level);
        setShowForm(true);
    };

    return (
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <h4 className="mb-3 text-sm font-semibold text-gray-800 dark:text-white/90">{categoryLabels[category]}</h4>

            <div className="mb-3 flex flex-wrap gap-2">
                {items.length === 0 && (
                    <span className="text-xs italic text-gray-400">No skills added</span>
                )}
                {items.map((item, idx) => (
                    <span
                        key={idx}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-400"
                        onClick={() => startEdit(idx)}
                    >
                        {item.name} <span className="opacity-60">({item.level})</span>
                        <button onClick={(e) => { e.stopPropagation(); onRemove(category, idx); }} className="hover:text-error-500">
                            <X size={12} />
                        </button>
                    </span>
                ))}
            </div>

            {showForm && (
                <div className="flex flex-col gap-3">
                    <Input label="Skill name" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
                    <Slider value={level} onChange={(v) => setLevel(v)} label="Proficiency" />
                    <div className="flex gap-2">
                        <button onClick={handleDone} className="rounded-lg bg-brand-500 px-4 py-1.5 text-xs font-medium text-white hover:bg-brand-600">
                            {editIdx !== null ? "Update" : "Add"}
                        </button>
                        <button onClick={() => { setShowForm(false); setEditIdx(null); }} className="rounded-lg border border-gray-300 px-4 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {!showForm && (
                <button onClick={() => setShowForm(true)} className="text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
                    + Add {categoryLabels[category]}
                </button>
            )}
        </div>
    );
}

export default function SkillsForm() {
    const resume = useResumeBuilderStore((s) => s.resume);
    const updateResume = useResumeBuilderStore((s) => s.updateResume);

    const [categorized, setCategorized] = useState<CategorizedSkills>(() => {
        const cats: CategorizedSkills = {};
        for (const cat of categories) {
            cats[cat] = [];
        }
        return cats;
    });

    const flattenAndSave = useCallback((cats: CategorizedSkills) => {
        const flat = Object.values(cats).flat().map((s) => s.name);
        updateResume({ skills: flat });
    }, [updateResume]);

    const handleAdd = (cat: string, name: string, level: number) => {
        const next = { ...categorized };
        next[cat] = [...(next[cat] || []), { name, level }];
        setCategorized(next);
        flattenAndSave(next);
    };

    const handleRemove = (cat: string, index: number) => {
        const next = { ...categorized };
        next[cat] = (next[cat] || []).filter((_, idx) => idx !== index);
        setCategorized(next);
        flattenAndSave(next);
    };

    const handleEdit = (cat: string, index: number, name: string, level: number) => {
        const next = { ...categorized };
        next[cat] = (next[cat] || []).map((item, idx) =>
            idx === index ? { name, level } : item
        );
        setCategorized(next);
        flattenAndSave(next);
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/10">
                    <Wrench size={20} className="text-brand-500" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white/90">Skills</h3>
            </div>

            <div className="flex flex-col gap-4">
                {categories.map((cat) => (
                    <SkillCategory
                        key={cat}
                        category={cat}
                        items={categorized[cat] || []}
                        onAdd={handleAdd}
                        onRemove={handleRemove}
                        onEdit={handleEdit}
                    />
                ))}
            </div>
        </div>
    );
}
