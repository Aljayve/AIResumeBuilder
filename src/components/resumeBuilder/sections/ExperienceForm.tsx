import { useState } from "react";
import { useResumeBuilderStore } from "../../../store/resumeBuilderStore";
import type { Experience } from "../../../store/resumeBuilderStore";
import { Briefcase, Plus } from "lucide-react";
import Input from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import DateInput from "../../ui/DateInput";
import MoveEditSection from "../shared/MoveEditSection";
import SwitchWidget from "../shared/SwitchWidget";

export default function ExperienceForm() {
    const resume = useResumeBuilderStore((s) => s.resume);
    const updateResume = useResumeBuilderStore((s) => s.updateResume);
    const items = resume.experience;
    const [expanded, setExpanded] = useState<string | false>(items[0]?.id ?? false);

    const handleChange = (panel: string, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const setItems = (next: Experience[]) => updateResume({ experience: next });

    const add = () => {
        const id = `${Date.now()}-${Math.random()}`;
        const next: Experience[] = [...items, { id, company: "", position: "", startDate: "", endDate: "", description: "", isWorkingHere: false, years: "", url: "" }];
        setItems(next);
        handleChange(id, true);
    };

    const remove = (i: number) => {
        const next = items.filter((_, idx) => idx !== i);
        setItems(next);
    };

    const update = (i: number, field: string, value: any) => {
        const next = items.map((item, idx) => (idx === i ? { ...item, [field]: value } : item));
        setItems(next);
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
                        <Briefcase size={20} className="text-brand-500" />
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-white/90">Experience</h3>
                </div>
                <button onClick={add} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-2 text-xs font-medium text-white hover:bg-brand-600">
                    <Plus size={14} /> Add
                </button>
            </div>

            <div className="space-y-3">
                {items.length === 0 && (
                    <p className="text-sm italic text-gray-400">No experience added yet.</p>
                )}
                {items.map((item, i) => (
                    <MoveEditSection
                        key={item.id}
                        title={item.company || item.position || "Experience"}
                        expanded={expanded === item.id}
                        length={items.length}
                        index={i}
                        clickHandler={() => handleChange(item.id, expanded !== item.id)}
                        onMoveUp={onMoveUp}
                        onMoveDown={onMoveDown}
                        onDelete={remove}
                    >
                        <div className="flex flex-col gap-4">
                            <Input label="Company" value={item.company} onChange={(e) => update(i, "company", e.target.value)} required />
                            <Input label="Position" value={item.position} onChange={(e) => update(i, "position", e.target.value)} required />
                            <DateInput
                                label="Start date"
                                value={item.startDate}
                                onChange={(v) => update(i, "startDate", v)}
                                required
                            />
                            <SwitchWidget
                                label="I currently work here"
                                value={item.isWorkingHere}
                                onChange={(v) => update(i, "isWorkingHere", v)}
                            />
                            <DateInput
                                label="End date"
                                value={item.endDate}
                                onChange={(v) => update(i, "endDate", v)}
                                disabled={item.isWorkingHere}
                            />
                            <Input label="Years" value={item.years} onChange={(e) => update(i, "years", e.target.value)} />
                            <TextArea label="Description" value={item.description} onChange={(e) => update(i, "description", e.target.value)} rows={4} />
                        </div>
                    </MoveEditSection>
                ))}
            </div>
        </div>
    );
}
