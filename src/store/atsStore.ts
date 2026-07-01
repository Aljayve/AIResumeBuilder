import { create } from "zustand";
import { atsApi, type AtsAnalysisResult } from "../api/ats.api";

interface AtsState {
    result: AtsAnalysisResult | null;
    loading: boolean;
    error: string | null;
    progress: number;
    stage: string;
    resumeId: string;
    jobDescription: string;
    setFormData: (resumeId: string, jobDescription: string) => void;
    analyze: () => Promise<void>;
    clear: () => void;
}

export const useAtsStore = create<AtsState>((set, get) => ({
    result: null,
    loading: false,
    error: null,
    progress: 0,
    stage: "",
    resumeId: "",
    jobDescription: "",

    setFormData: (resumeId, jobDescription) => set({ resumeId, jobDescription }),

    analyze: async () => {
        const { resumeId, jobDescription } = get();
        if (!resumeId || !jobDescription.trim()) return;

        set({ loading: true, error: null, result: null, progress: 0, stage: "Parsing resume..." });

        const stages = [
            { limit: 20, label: "Parsing resume..." },
            { limit: 40, label: "Analyzing keywords..." },
            { limit: 60, label: "Calculating scores..." },
            { limit: 80, label: "Generating recommendations..." },
            { limit: 95, label: "Finalizing results..." },
        ];

        let stageIndex = 0;
        const interval = setInterval(() => {
            const current = get().progress;
            const target = stages[stageIndex]?.limit ?? 95;
            if (current < target) {
                set({ progress: Math.min(current + Math.floor(Math.random() * 6) + 2, target) });
            } else if (stageIndex < stages.length - 1) {
                stageIndex++;
                set({ stage: stages[stageIndex].label });
            }
        }, 300);

        try {
            const { data } = await atsApi.analyze({ resumeId, jobDescription });
            clearInterval(interval);
            set({ result: data, loading: false, progress: 100, stage: "Complete!" });
        } catch (e: any) {
            clearInterval(interval);
            const msg = e?.response?.data?.message ?? "Analysis failed";
            set({ error: msg, loading: false, progress: 0, stage: "" });
        }
    },

    clear: () => set({
        result: null, error: null, loading: false,
        progress: 0, stage: "", resumeId: "", jobDescription: "",
    }),
}));
