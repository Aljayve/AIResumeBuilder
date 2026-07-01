import { useEffect, useState } from "react";
import { toast } from "sonner";
import GeneralSettingsCard from "../../../components/admin/settings/GeneralSettingsCard";
import AISettingsCard from "../../../components/admin/settings/AISettingsCard";
import ResumeSettingsCard from "../../../components/admin/settings/ResumeSettingsCard";
import UploadSettingsCard from "../../../components/admin/settings/UploadSettingsCard";
import SecuritySettingsCard from "../../../components/admin/settings/SecuritySettingsCard";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import PageMeta from "../../../components/common/PageMeta";
import { adminApi, type AdminSettings } from "../../../api/admin.api";

export default function SettingsPage() {
    const [settings, setSettings] = useState<AdminSettings | null>(null);
    const [templates, setTemplates] = useState<string[]>([]);

    useEffect(() => {
        Promise.all([
            adminApi.getSettings(),
            adminApi.getTemplates(),
        ]).then(([settingsRes, templatesRes]) => {
            setSettings(settingsRes.data);
            setTemplates(templatesRes.data.map((t) => t.name));
        });
    }, []);

    const save = async (dto: Partial<AdminSettings>) => {
        try {
            const res = await adminApi.updateSettings(dto);
            setSettings(res.data);
            toast.success("Settings saved");
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to save settings");
        }
    };

    if (!settings) {
        return (
            <div className="flex h-64 items-center justify-center">
                <p className="text-gray-500">Loading settings...</p>
            </div>
        );
    }

    return (
        <>
            <PageMeta
                title="Admin Settings"
                description="Admin Settings - ResumeAI"
            />
            <PageBreadcrumb pageTitle="Settings" />

            <div className="space-y-6">
                <div className="grid gap-6 xl:grid-cols-2">
                    <GeneralSettingsCard
                        siteName={settings.siteName}
                        supportEmail={settings.supportEmail}
                        defaultLanguage={settings.defaultLanguage}
                        onSave={(data) => save(data)}
                    />
                    <AISettingsCard
                        provider={settings.aiProvider}
                        apiKey={settings.aiApiKey}
                        enabled={settings.aiEnabled}
                        customBaseUrl={settings.aiCustomBaseUrl}
                        customModel={settings.aiCustomModel}
                        onSave={(data) => save(data)}
                    />
                </div>

                <div className="grid gap-6 xl:grid-cols-2">
                    <ResumeSettingsCard
                        maxResumesPerUser={settings.maxResumesPerUser}
                        defaultTemplate={settings.defaultTemplate}
                        enableATSScore={settings.enableATSScore}
                        templates={templates}
                        onSave={(data) => save(data)}
                    />
                    <UploadSettingsCard
                        maxFileSize={settings.maxFileSize}
                        allowedFormats={settings.allowedFormats}
                        enableCompression={settings.enableCompression}
                        onSave={(data) => save(data)}
                    />
                </div>

                <div className="grid gap-6 xl:grid-cols-2">
                    <SecuritySettingsCard
                        allowRegistration={settings.allowRegistration}
                        requireEmailVerification={settings.requireEmailVerification}
                        enableTwoFactor={settings.enableTwoFactor}
                        onSave={(data) => save(data)}
                    />
                </div>
            </div>
        </>
    );
}
