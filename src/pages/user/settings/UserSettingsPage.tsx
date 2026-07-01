import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import PageMeta from "../../../components/common/PageMeta";
import AccountSettingsCard from "../../../components/settings/AccountSettingsCard";
import AppearanceSettingsCard from "../../../components/settings/AppearanceSettingsCard";
import NotificationSettingsCard from "../../../components/settings/NotificationSettingsCard";
import ProfileSettingsCard from "../../../components/settings/ProfileSettingsCard";
import ResumePreferencesCard from "../../../components/settings/ResumePreferencesCard";
import SecuritySettingsCard from "../../../components/settings/SecuritySettingsCard";
import { useAuthStore } from "../../../store/authStore";

export default function UserSettingsPage() {
    const { user } = useAuthStore();

    return (
        <>
            <PageMeta
                title="Settings"
                description="User Settings"
            />

            <PageBreadcrumb pageTitle="Settings" />

            <div className="grid gap-6 xl:grid-cols-2">
                <ProfileSettingsCard
                    profile={{
                        firstName: user?.firstName ?? "",
                        lastName: user?.lastName ?? "",
                        headline: user?.headline ?? "",
                        phone: user?.phone ?? "",
                        location: user?.location ?? "",
                        linkedin: user?.linkedinUrl ?? "",
                        website: user?.website ?? "",
                    }}
                />

                <AccountSettingsCard
                    account={{
                        email: user?.email ?? "",
                        plan: user?.plan ?? "Free",
                        createdAt: user?.createdAt
                            ? new Date(user.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })
                            : "",
                    }}
                />

                <NotificationSettingsCard
                    notifications={{
                        email: true,
                        exports: true,
                        atsUpdates: true,
                        reminders: false,
                    }}
                />

                <ResumePreferencesCard
                    preferences={{
                        defaultTemplate: "ATS Classic",
                        exportFormat: "PDF",
                        autoSave: true,
                        atsOptimization: true,
                    }}
                />

                <AppearanceSettingsCard />

                <SecuritySettingsCard />
            </div>
        </>
    )
}
