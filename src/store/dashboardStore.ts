import { create } from "zustand";
import { resumeApi, type ResumeSummary } from "../api/resume.api";

interface DashboardState {
    resumes: ResumeSummary[];
    loading: boolean;
    fetchResumes: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    resumes: [],
    loading: true,
    fetchResumes: async () => {
        set({ loading: true });
        try {
            const res = await resumeApi.getAll();
            set({ resumes: res.data, loading: false });
        } catch {
            set({ loading: false });
        }
    },
}));
