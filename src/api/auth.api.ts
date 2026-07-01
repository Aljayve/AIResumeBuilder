import api from "./axios";

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AuthResponse {
    message: string;
    accessToken: string;
}

export interface ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}

export const authApi = {
    login: (dto: LoginDto) =>
        api.post<AuthResponse>("/auth/login", dto),

    register: (dto: RegisterDto) =>
        api.post<AuthResponse>("/auth/register", dto),

    changePassword: (dto: ChangePasswordDto) =>
        api.post("/auth/change-password", dto),
};
