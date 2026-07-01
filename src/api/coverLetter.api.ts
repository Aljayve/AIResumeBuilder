import api from "./axios";

export interface GeneratePayload {
    resumeId: string;
    jobTitle: string;
    companyName: string;
    jobDescription?: string;
}

export interface CoverLetterDoc {
    _id: string;
    userId: string;
    resumeId: string;
    jobTitle: string;
    companyName: string;
    jobDescription: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

export const coverLetterApi = {
    generate(payload: GeneratePayload) {
        return api.post<CoverLetterDoc>("/cover-letters/generate", payload).then(r => r.data);
    },
    list() {
        return api.get<CoverLetterDoc[]>("/cover-letters").then(r => r.data);
    },
    getById(id: string) {
        return api.get<CoverLetterDoc>(`/cover-letters/${id}`).then(r => r.data);
    },
    remove(id: string) {
        return api.delete<CoverLetterDoc>(`/cover-letters/${id}`).then(r => r.data);
    },
    async exportPdf(id: string) {
        const res = await api.post(`/cover-letters/${id}/export/pdf`, {}, { responseType: "blob" });
        downloadBlob(res.data, "cover-letter.pdf");
    },
    async exportDocx(id: string) {
        const res = await api.post(`/cover-letters/${id}/export/docx`, {}, { responseType: "blob" });
        downloadBlob(res.data, "cover-letter.docx");
    },
};
