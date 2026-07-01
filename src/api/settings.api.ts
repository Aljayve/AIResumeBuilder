import api from "./axios";

export interface UpdateProfileDto {
    firstName?: string;
    lastName?: string;
    headline?: string;
    phone?: string;
    location?: string;
    linkedinUrl?: string;
    website?: string;
}

export const settingsApi = {
    updateProfile: (dto: UpdateProfileDto) => api.patch("/users/profile", dto),
    uploadAvatar: (file: File) => {
        const form = new FormData();
        form.append("file", file);
        return api.patch("/users/avatar", form, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },
};
