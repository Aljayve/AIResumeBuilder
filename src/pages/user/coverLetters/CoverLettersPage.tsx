import { useState } from "react";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import CoverLetterForm from "../../../components/coverLetters/CoverLetterForm";
import CoverLetterToolbar from "../../../components/coverLetters/CoverLetterToolbar";
import CoverLetterPreview from "../../../components/coverLetters/CoverLetterPreview";

export default function CoverLettersPage() {
    const [content, setContent] = useState("");

    return (
        <>
            <PageMeta
                title="Cover Letters - ResumeAI"
                description="Generate personalized cover letters for any job."
            />
            <PageBreadcrumb pageTitle="Cover Letters" />

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-6">
                    <CoverLetterForm onContentChange={setContent} />
                </div>

                <div className="space-y-6">
                    <CoverLetterToolbar content={content} />
                    <CoverLetterPreview content={content} />
                </div>
            </div>
        </>
    );
}
