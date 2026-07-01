import { useState, useEffect, useRef } from "react";
import { User, Camera } from "lucide-react";
import { toast } from "sonner";
import { settingsApi } from "../../api/settings.api";
import { useAuthStore } from "../../store/authStore";

interface Props {
    profile: {
        firstName: string;
        lastName: string;
        headline: string;
        phone: string;
        location: string;
        linkedin: string;
        website: string;
    };
}

export default function ProfileSettingsCard({ profile }: Props) {
    const [form, setForm] = useState(profile);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);
    const { user, fetchUser } = useAuthStore();

    useEffect(() => {
        setForm(profile);
    }, [profile]);

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await settingsApi.updateProfile({
                firstName: form.firstName,
                lastName: form.lastName,
                headline: form.headline,
                phone: form.phone,
                location: form.location,
                linkedinUrl: form.linkedin,
                website: form.website,
            });
            await fetchUser();
            toast.success("Profile updated");
        } catch {
            toast.error("Failed to save profile");
        } finally {
            setSaving(false);
        }
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            await settingsApi.uploadAvatar(file);
            await fetchUser();
            toast.success("Avatar updated");
        } catch {
            toast.error("Failed to upload avatar");
        } finally {
            setUploading(false);
            if (fileRef.current) fileRef.current.value = "";
        }
    };

    const avatarUrl = user?.avatar?.url;
    const initials = `${form.firstName[0] || ""}${form.lastName[0] || ""}`.toUpperCase();

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                    <User size={20} />
                </span>
                <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">Profile Information</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Your personal details</p>
                </div>
            </div>

            <div className="mt-5 flex items-center gap-4 pb-5 border-b border-gray-100 dark:border-gray-800">
                <div className="relative group">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-lg font-bold text-brand-500 dark:bg-brand-500/10 overflow-hidden">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                            initials
                        )}
                    </div>
                    <button
                        onClick={() => fileRef.current?.click()}
                        disabled={uploading}
                        className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white hover:bg-brand-600 transition-colors disabled:opacity-50"
                    >
                        <Camera size={12} />
                    </button>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                    />
                </div>
                <div>
                    <p className="font-medium text-gray-900 dark:text-white">{form.firstName} {form.lastName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{form.headline}</p>
                </div>
            </div>

            <div className="mt-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                        <input
                            value={form.firstName}
                            onChange={(e) => handleChange("firstName", e.target.value)}
                            className="h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                        <input
                            value={form.lastName}
                            onChange={(e) => handleChange("lastName", e.target.value)}
                            className="h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
                        />
                    </div>
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Professional Headline</label>
                    <input
                        value={form.headline}
                        onChange={(e) => handleChange("headline", e.target.value)}
                        className="h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
                    />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                        <input
                            value={form.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            className="h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                        <input
                            value={form.location}
                            onChange={(e) => handleChange("location", e.target.value)}
                            className="h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
                        />
                    </div>
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn URL</label>
                    <input
                        value={form.linkedin}
                        onChange={(e) => handleChange("linkedin", e.target.value)}
                        className="h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
                    <input
                        value={form.website}
                        onChange={(e) => handleChange("website", e.target.value)}
                        className="h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
                    />
                </div>
            </div>

            <div className="mt-5 flex justify-end border-t border-gray-100 pt-4 dark:border-gray-800">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-lg bg-brand-500 px-5 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
}
