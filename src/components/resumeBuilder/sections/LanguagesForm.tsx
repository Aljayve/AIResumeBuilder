import { useState } from "react";
import { useResumeBuilderStore } from "../../../store/resumeBuilderStore";
import type { Language } from "../../../store/resumeBuilderStore";
import { Globe, Plus } from "lucide-react";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import MoveEditSection from "../shared/MoveEditSection";

const proficiencyOptions = [
    { value: "Native", label: "Native" },
    { value: "Fluent", label: "Fluent" },
    { value: "Advanced", label: "Advanced" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Basic", label: "Basic" },
];

export default function LanguagesForm() {
    const resume = useResumeBuilderStore((s) => s.resume);
    const updateResume = useResumeBuilderStore((s) => s.updateResume);
    const items = resume.languages;
    const [expanded, setExpanded] = useState<string | false>(items[0]?.id ?? false);

    const handleChange = (panel: string, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const setItems = (next: Language[]) => updateResume({ languages: next });

    const add = () => {
        const id = `${Date.now()}-${Math.random()}`;
        const next: Language[] = [...items, { id, name: "", proficiency: "Fluent" }];
        setItems(next);
        handleChange(id, true);
    };

    const remove = (i: number) => setItems(items.filter((_, idx) => idx !== i));

    const update = (i: number, field: string, value: any) => {
        setItems(items.map((item, idx) => (idx === i ? { ...item, [field]: value } : item)));
    };

    const onMoveUp = (i: number) => {
        if (i === 0) return;
        const next = [...items];
        [next[i - 1], next[i]] = [next[i], next[i - 1]];
        setItems(next);
    };

    const onMoveDown = (i: number) => {
        if (i === items.length - 1) return;
        const next = [...items];
        [next[i], next[i + 1]] = [next[i + 1], next[i]];
        setItems(next);
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/10">
                        <Globe size={20} className="text-brand-500" />
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-white/90">Languages</h3>
                </div>
                <button onClick={add} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-2 text-xs font-medium text-white hover:bg-brand-600">
                    <Plus size={14} /> Add
                </button>
            </div>

            <div className="space-y-3">
                {items.length === 0 && (
                    <p className="text-sm italic text-gray-400">No languages added yet.</p>
                )}
                {items.map((item, i) => (
                    <MoveEditSection
                        key={item.id}
                        title={item.name || "Language"}
                        expanded={expanded === item.id}
                        length={items.length}
                        index={i}
                        clickHandler={() => handleChange(item.id, expanded !== item.id)}
                        onMoveUp={onMoveUp}
                        onMoveDown={onMoveDown}
                        onDelete={remove}
                    >
                        <div className="flex flex-col gap-4">
                            <Input label="Language" value={item.name} onChange={(e) => update(i, "name", e.target.value)} required />
                            <Select
                                label="Proficiency"
                                value={item.proficiency}
                                onChange={(v) => update(i, "proficiency", v)}
                                options={proficiencyOptions}
                            />
                        </div>
                    </MoveEditSection>
                ))}
            </div>
        </div>
    );
}
