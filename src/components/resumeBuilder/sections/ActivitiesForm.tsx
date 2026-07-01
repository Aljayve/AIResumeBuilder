import { useState } from "react";
import { useResumeBuilderStore } from "../../../store/resumeBuilderStore";
import { HeartHandshake } from "lucide-react";
import Tabs from "../../ui/Tabs";
import TextArea from "../../ui/TextArea";

export default function ActivitiesForm() {
    const resume = useResumeBuilderStore((s) => s.resume);
    const updateResume = useResumeBuilderStore((s) => s.updateResume);
    const [activeTab, setActiveTab] = useState(0);

    const update = (field: string, value: string) => {
        updateResume({
            activities: { ...resume.activities, [field]: value },
        });
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/10">
                    <HeartHandshake size={20} className="text-brand-500" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white/90">Activities</h3>
            </div>

            <Tabs tabs={["Involvements", "Achievements"]} activeTab={activeTab} onChange={setActiveTab} className="mb-5" />

            {activeTab === 0 && (
                <TextArea
                    label="Involvements"
                    value={resume.activities.involvements}
                    onChange={(e) => update("involvements", e.target.value)}
                    rows={6}
                />
            )}
            {activeTab === 1 && (
                <TextArea
                    label="Achievements"
                    value={resume.activities.achievements}
                    onChange={(e) => update("achievements", e.target.value)}
                    rows={6}
                />
            )}
        </div>
    );
}
