import { create } from "zustand";
import { coverLetterApi, type CoverLetterDoc } from "../api/coverLetter.api";

interface CoverLetterStore {
    current: CoverLetterDoc | null;
    list: CoverLetterDoc[];
    loading: boolean;
    generating: boolean;
    error: string | null;
    generate: (payload: {
        resumeId: string;
        jobTitle: string;
        companyName: string;
        jobDescription?: string;
    }) => Promise<void>;
    fetchList: () => Promise<void>;
    clear: () => void;
}

export const useCoverLetterStore = create<CoverLetterStore>((set) => ({
    current: null,
    list: [],
    loading: false,
    generating: false,
    error: null,

    async generate(payload) {
        set({ generating: true, error: null });
        try {
            const doc = await coverLetterApi.generate(payload);
            set({ current: doc, generating: false });
        } catch (e: any) {
            const msg = e?.response?.data?.message || e?.message || "Failed to generate cover letter";
            set({ error: msg, generating: false });
        }
    },

    async fetchList() {
        set({ loading: true, error: null });
        try {
            const list = await coverLetterApi.list();
            set({ list, loading: false });
        } catch (e: any) {
            set({ error: e?.message || "Failed to load cover letters", loading: false });
        }
    },

    clear() {
        set({ current: null, error: null });
    },
}));
