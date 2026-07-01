import { createBrowserRouter } from "react-router";
import PublicLayout from "../layouts/PublicLayout/PublicLayout";
import HomePage from "../pages/public/Home/HomePage";
import ForgotPasswordPage from "../pages/public/ForgotPassword/ForgotPasswordPage";
import UserLayout from "../layouts/UserLayout/UserLayout";
import DashboardPage from "../pages/user/DashboardPage";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import NotFoundPage from "../pages/public/NotFoundPage";
import AuthPage from "../pages/public/Authentication/AuthPage";
import ResumesPage from "../pages/user/resumes/ResumesPage";
import ATSCheckerPage from "../pages/user/ats/ATSCheckerPage";
import ATSScanPage from "../pages/user/ats/ATSScanPage";
import ATSResultPage from "../pages/user/ats/ATSResultPage";
import JobMatcherPage from "../pages/user/jobs/JobMatcherPage";
import InterviewPrepPage from "../pages/user/interviewPrep/InterviewPrepPage";
import CoverLettersPage from "../pages/user/coverLetters/CoverLettersPage";
import TemplatesPage from "../pages/user/templates/TemplatesPage";
import ResumeBuilderPage from "../pages/user/resumeBuilder/ResumeBuilderPage";
import AdminDashboardPage from "../pages/admin/dashboard/AdminDashboardPage";
import UsersPage from "../pages/admin/users/UsersPage";
import ResumesManagementPage from "../pages/admin/resumes/ResumesManagementPage";
import AdminTemplatesPage from "../pages/admin/templates/AdminTemplatesPage";
import AnalyticsPage from "../pages/admin/analytics/AnalyticsPage";
import SettingsPage from "../pages/admin/settings/SettingsPage";
import UserSettingsPage from "../pages/user/settings/UserSettingsPage";
import PaymentCallbackPage from "../pages/user/payment/PaymentCallbackPage";

export const router = createBrowserRouter([
    {
        element: <PublicLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/auth",
                element: <AuthPage />,
            },
            {
                path: "/forgot-password",
                element: <ForgotPasswordPage />,
            },
            {
                path: "*",
                element: <NotFoundPage />
            }
        ],
    },

    {
        path: "/dashboard",
        element: <UserLayout />,
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: "resumes",
                element: <ResumesPage />
            },
            {
                path: "ats",
                element: <ATSCheckerPage />
            },
            {
                path: "ats/scan",
                element: <ATSScanPage />
            },
            {
                path: "ats/result",
                element: <ATSResultPage />
            },
            {
                path: "jobs",
                element: <JobMatcherPage />
            },
            {
                path: "interview-prep",
                element: <InterviewPrepPage />
            },
            {
                path: "cover-letters",
                element: <CoverLettersPage />
            },
            {
                path: "templates",
                element: <TemplatesPage />
            },
            {
                path: "resumes/create",
                element: <ResumeBuilderPage />
            },
            {
                path: "resumes/:resumeId",
                element: <ResumeBuilderPage />
            },
            {
                path: "settings",
                element: <UserSettingsPage />
            },
            {
                path: "settings/payment-callback",
                element: <PaymentCallbackPage />
            },
            {
                path: "*",
                element: <NotFoundPage />
            }
        ],
    },

    {
        path: "/admin",
        children: [
            {
                path: "login",
                element: <AdminLoginPage />,
            },
            {
                element: <AdminLayout />,
                children: [
                    {
                        path: "dashboard",
                        element: <AdminDashboardPage />,
                    },
                    {
                        path: "users",
                        element: <UsersPage />
                    },
                    {
                        path: "resumes",
                        element: <ResumesManagementPage />
                    },
                    {
                        path: "templates",
                        element: <AdminTemplatesPage />
                    },
                    {
                        path: "analytics",
                        element: <AnalyticsPage />
                    },
                    {
                        path: "settings",
                        element: <SettingsPage />
                    },
                    {
                        path: "*",
                        element: <NotFoundPage />
                    }
                ],
            },
        ],
    },
]);