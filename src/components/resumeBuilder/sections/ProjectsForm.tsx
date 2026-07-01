import { useState } from "react";
import { useResumeBuilderStore } from "../../../store/resumeBuilderStore";
import type { Project } from "../../../store/resumeBuilderStore";
import { FolderGit2, Plus } from "lucide-react";
import Input from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import MoveEditSection from "../shared/MoveEditSection";

export default function ProjectsForm() {
    const resume = useResumeBuilderStore((s) => s.resume);
    const updateResume = useResumeBuilderStore((s) => s.updateResume);
    const items = resume.projects;
    const [expanded, setExpanded] = useState<string | false>(items[0]?.id ?? false);

    const handleChange = (panel: string, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const setItems = (next: Project[]) => updateResume({ projects: next });

    const add = () => {
        const id = `${Date.now()}-${Math.random()}`;
        const next: Project[] = [...items, { id, name: "", description: "", technologies: [], link: "" }];
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
                        <FolderGit2 size={20} className="text-brand-500" />
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-white/90">Projects</h3>
                </div>
                <button onClick={add} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-2 text-xs font-medium text-white hover:bg-brand-600">
                    <Plus size={14} /> Add
                </button>
            </div>

            <div className="space-y-3">
                {items.length === 0 && (
                    <p className="text-sm italic text-gray-400">No projects added yet.</p>
                )}
                {items.map((item, i) => (
                    <MoveEditSection
                        key={item.id}
                        title={item.name || "Project"}
                        expanded={expanded === item.id}
                        length={items.length}
                        index={i}
                        clickHandler={() => handleChange(item.id, expanded !== item.id)}
                        onMoveUp={onMoveUp}
                        onMoveDown={onMoveDown}
                        onDelete={remove}
                    >
                        <div className="flex flex-col gap-4">
                            <Input label="Project name" value={item.name} onChange={(e) => update(i, "name", e.target.value)} required />
                            <TextArea label="Description" value={item.description} onChange={(e) => update(i, "description", e.target.value)} rows={3} />
                            <Input label="URL" value={item.link || ""} onChange={(e) => update(i, "link", e.target.value)} />
                            <Input
                                label="Technologies (comma separated)"
                                value={(item.technologies || []).join(", ")}
                                onChange={(e) => update(i, "technologies", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))}
                            />
                        </div>
                    </MoveEditSection>
                ))}
            </div>
        </div>
    );
}
