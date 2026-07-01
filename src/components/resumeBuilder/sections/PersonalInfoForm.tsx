import { useState, useRef } from "react";
import { useResumeBuilderStore } from "../../../store/resumeBuilderStore";
import type { PersonalInfo } from "../../../store/resumeBuilderStore";
import { User, Upload, Wand2, X } from "lucide-react";
import { processPhotoBg } from "../../../utils/photoUtils";
import Input from "../../ui/Input";
import Tabs from "../../ui/Tabs";
import TextArea from "../../ui/TextArea";

export default function PersonalInfoForm() {
    const resume = useResumeBuilderStore((s) => s.resume);
    const updatePersonalInfo = useResumeBuilderStore((s) => s.updatePersonalInfo);
    const fileRef = useRef<HTMLInputElement>(null);
    const [processing, setProcessing] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const update = (field: keyof PersonalInfo, value: any) => {
        updatePersonalInfo({ [field]: value });
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            updatePersonalInfo({ photo: reader.result as string, photoFilter: "none" });
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveBg = () => {
        if (!resume.personalInfo.photo) return;
        setProcessing(true);
        processPhotoBg(resume.personalInfo.photo)
            .then((processed) => {
                updatePersonalInfo({ photo: processed, photoFilter: "remove-bg" });
                setProcessing(false);
            })
            .catch(() => setProcessing(false));
    };

    const handleResetPhoto = () => {
        updatePersonalInfo({ photo: "", photoFilter: "none" });
        if (fileRef.current) fileRef.current.value = "";
    };

    const hasPhoto = !!resume.personalInfo.photo;
    const pi = resume.personalInfo;

    const updateProfile = (index: number, field: string, value: string) => {
        const profiles = [...(pi.profiles || [])];
        if (!profiles[index]) return;
        profiles[index] = { ...profiles[index], [field]: value };
        update("profiles", profiles);
    };

    const contactFields = (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                    {hasPhoto ? (
                        <img src={pi.photo} alt="" className="h-full w-full object-cover" />
                    ) : (
                        <User size={28} className="text-gray-400" />
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-xs font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                        <Upload size={14} />{hasPhoto ? "Change" : "Upload"}
                    </button>
                    {hasPhoto && (
                        <>
                            <button onClick={handleRemoveBg} disabled={processing} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-xs font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                                <Wand2 size={14} />{processing ? "..." : "Remove BG"}
                            </button>
                            <button onClick={handleResetPhoto} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-xs font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                                <X size={14} />Remove
                            </button>
                        </>
                    )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </div>
            <Input label="First Name" value={pi.firstName} onChange={(e) => update("firstName", e.target.value)} required />
            <Input label="Last Name" value={pi.lastName} onChange={(e) => update("lastName", e.target.value)} required />
            <Input label="Title" value={pi.label} onChange={(e) => update("label", e.target.value)} />
            <Input label="Email" value={pi.email} onChange={(e) => update("email", e.target.value)} />
            <Input label="Phone" value={pi.phone} onChange={(e) => update("phone", e.target.value)} />
            <Input label="Website URL" value={pi.url} onChange={(e) => update("url", e.target.value)} />
            <Input label="Location" value={pi.address} onChange={(e) => update("address", e.target.value)} />
        </div>
    );

    const profiles = pi.profiles || [];
    const linkFields = (
        <div className="flex flex-col gap-4">
            {["linkedin", "twitter", "github", "hackerrank", "hackerearth", "codechef", "leetcode", "cssbattle"].map((network) => {
                const idx = profiles.findIndex((p) => p.network === network);
                const profile = idx >= 0 ? profiles[idx] : null;
                return (
                    <Input
                        key={network}
                        label={network.charAt(0).toUpperCase() + network.slice(1)}
                        value={profile?.url || ""}
                        onChange={(e) => {
                            const newProfiles = [...profiles];
                            const existingIdx = newProfiles.findIndex((p) => p.network === network);
                            if (existingIdx >= 0) {
                                newProfiles[existingIdx] = { ...newProfiles[existingIdx], url: e.target.value };
                            } else {
                                newProfiles.push({ network, username: "", url: e.target.value });
                            }
                            update("profiles", newProfiles);
                        }}
                    />
                );
            })}
        </div>
    );

    const aboutFields = (
        <div className="flex flex-col gap-4">
            <TextArea
                label="Summary"
                value={pi.summary}
                onChange={(e) => update("summary", e.target.value)}
                rows={5}
            />
            <TextArea
                label="Objective"
                value={pi.objective}
                onChange={(e) => update("objective", e.target.value)}
                rows={5}
            />
        </div>
    );

    const tabLabels = ["Contacts", "Links", "About"];

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/10">
                    <User size={20} className="text-brand-500" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white/90">Personal Info</h3>
            </div>

            <Tabs tabs={tabLabels} activeTab={activeTab} onChange={setActiveTab} className="mb-5" />

            {activeTab === 0 && contactFields}
            {activeTab === 1 && linkFields}
            {activeTab === 2 && aboutFields}
        </div>
    );
}
