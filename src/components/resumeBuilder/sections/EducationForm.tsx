import { useState } from "react";
import { useResumeBuilderStore } from "../../../store/resumeBuilderStore";
import type { Education } from "../../../store/resumeBuilderStore";
import { GraduationCap, Plus } from "lucide-react";
import Input from "../../ui/Input";
import DateInput from "../../ui/DateInput";
import MoveEditSection from "../shared/MoveEditSection";
import SwitchWidget from "../shared/SwitchWidget";

export default function EducationForm() {
    const resume = useResumeBuilderStore((s) => s.resume);
    const updateResume = useResumeBuilderStore((s) => s.updateResume);
    const items = resume.education;
    const [expanded, setExpanded] = useState<string | false>(items[0]?.id ?? false);

    const handleChange = (panel: string, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const setItems = (next: Education[]) => updateResume({ education: next });

    const add = () => {
        const id = `${Date.now()}-${Math.random()}`;
        const next: Education[] = [...items, { id, school: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", score: "", isStudyingHere: false }];
        setItems(next);
        handleChange(id, true);
    };

    const remove = (i: number) => {
        setItems(items.filter((_, idx) => idx !== i));
    };

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
                        <GraduationCap size={20} className="text-brand-500" />
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-white/90">Education</h3>
                </div>
                <button onClick={add} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-2 text-xs font-medium text-white hover:bg-brand-600">
                    <Plus size={14} /> Add
                </button>
            </div>

            <div className="space-y-3">
                {items.length === 0 && (
                    <p className="text-sm italic text-gray-400">No education added yet.</p>
                )}
                {items.map((item, i) => (
                    <MoveEditSection
                        key={item.id}
                        title={item.school || item.degree || "Education"}
                        expanded={expanded === item.id}
                        length={items.length}
                        index={i}
                        clickHandler={() => handleChange(item.id, expanded !== item.id)}
                        onMoveUp={onMoveUp}
                        onMoveDown={onMoveDown}
                        onDelete={remove}
                    >
                        <div className="flex flex-col gap-4">
                            <Input label="School / Institution" value={item.school} onChange={(e) => update(i, "school", e.target.value)} required />
                            <Input label="Degree" value={item.degree} onChange={(e) => update(i, "degree", e.target.value)} required />
                            <Input label="Area / Field of study" value={item.fieldOfStudy} onChange={(e) => update(i, "fieldOfStudy", e.target.value)} />
                            <Input label="Grade / Score" value={item.score} onChange={(e) => update(i, "score", e.target.value)} />
                            <DateInput
                                label="Start date"
                                value={item.startDate}
                                onChange={(v) => update(i, "startDate", v)}
                            />
                            <SwitchWidget
                                label="I currently study here"
                                value={item.isStudyingHere}
                                onChange={(v) => update(i, "isStudyingHere", v)}
                            />
                            <DateInput
                                label="End date"
                                value={item.endDate}
                                onChange={(v) => update(i, "endDate", v)}
                                disabled={item.isStudyingHere}
                            />
                        </div>
                    </MoveEditSection>
                ))}
            </div>
        </div>
    );
}
