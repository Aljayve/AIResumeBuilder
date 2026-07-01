import PageMeta from "../../../components/common/PageMeta";
import ATSPreviewSection from "./sections/ATSPreviewSection";
import CTASection from "./sections/CTASection";
import FeaturesSection from "./sections/FeaturesSection";
import HeroSection from "./sections/HeroSection";
import HowItWorksSections from "./sections/HowItWorksSections";
import TemplatesSection from "./sections/TemplatesSection";
import TestimonialsSection from "./sections/TestimonialsSection";

export default function HomePage() {
    return (
        <>
            <PageMeta
                title="ResumeAI - Build ATS-Friendly Resumes"
                description="Create optimized, ATS-friendly resumes with AI-powered suggestions and real-time scoring."
            />
            <section className="py-28">
                <div className="mx-auto max-w-7xl px-6">
                    <HeroSection />
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <FeaturesSection />
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <HowItWorksSections />
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <TemplatesSection />
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <ATSPreviewSection />
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <TestimonialsSection />
                </div>
            </section>

            <section className="py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <CTASection />
                </div>
            </section>
        </>
    )
}
