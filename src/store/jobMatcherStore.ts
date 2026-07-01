import { create } from "zustand";
import { jobMatcherApi, type MatchResult } from "../api/jobMatcher.api";

interface JobMatcherState {
    result: MatchResult | null;
    lastJobDescription: string;
    loading: boolean;
    error: string | null;
    analyze: (resumeId: string, jobDescription: string) => Promise<void>;
    clear: () => void;
}

export const useJobMatcherStore = create<JobMatcherState>((set) => ({
    result: null,
    lastJobDescription: "",
    loading: false,
    error: null,

    analyze: async (resumeId, jobDescription) => {
        set({ loading: true, error: null, result: null });
        try {
            const { data } = await jobMatcherApi.match(resumeId, jobDescription);
            set({ result: data, lastJobDescription: jobDescription, loading: false });
        } catch (e: any) {
            const msg = e?.response?.data?.message ?? "Analysis failed";
            set({ error: msg, loading: false });
        }
    },

    clear: () => set({ result: null, error: null }),
}));
