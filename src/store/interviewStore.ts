import { create } from "zustand";
import { interviewApi, type GenerateQuestionsResult } from "../api/interview.api";

type QuestionsMap = GenerateQuestionsResult["questions"];

interface InterviewState {
    questions: QuestionsMap | null;
    loading: boolean;
    error: string | null;
    generate: (resumeId: string, jobDescription?: string) => Promise<void>;
    clear: () => void;
}

export const useInterviewStore = create<InterviewState>((set) => ({
    questions: null,
    loading: false,
    error: null,

    generate: async (resumeId, jobDescription) => {
        set({ loading: true, error: null, questions: null });
        try {
            const { data } = await interviewApi.generate(resumeId, jobDescription);
            set({ questions: data.questions, loading: false });
        } catch (e: any) {
            const msg = e?.response?.data?.message ?? "Failed to generate questions";
            set({ error: msg, loading: false });
        }
    },

    clear: () => set({ questions: null, error: null }),
}));
