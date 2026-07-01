import api from "./axios";

export interface TemplateDoc {
    _id: string;
    title: string;
    slug: string;
    category: string;
    thumbnail: string;
    description: string;
    premium: boolean;
    enabled: boolean;
}

export const templateApi = {
    getAll(plan?: string) {
        const params = plan ? { plan } : {};
        return api.get<TemplateDoc[]>("/templates", { params }).then(r => r.data);
    },
    getBySlug(slug: string) {
        return api.get<TemplateDoc>(`/templates/${slug}`).then(r => r.data);
    },
};
