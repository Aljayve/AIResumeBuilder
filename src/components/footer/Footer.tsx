export default function Footer() {
    return (
        <footer className="border-t border-slate-200 dark:border-slate-800">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-10 md:grid-cols-4">
                    <div>
                        <h3 className="mb-4 text-lg font-bold">
                            ResumeAI
                        </h3>

                        <p className="text-sm text-slate-500">
                            AI-powered resume builder designed
                            for modern professionals.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold">
                            Product
                        </h4>

                        <ul className="space-y-2 text-sm text-slate-500">
                            <li>Features</li>
                            <li>Templates</li>
                            <li>Pricing</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold">
                            Resources
                        </h4>

                        <ul className="space-y-2 text-sm text-slate-500">
                            <li>Blog</li>
                            <li>Help Center</li>
                            <li>Guides</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold">
                            Company
                        </h4>

                        <ul className="space-y-2 text-sm text-slate-500">
                            <li>About</li>
                            <li>Contact</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500 dark:border-slate-800">
                    © 2026 ResumeAI. All rights reserved.
                </div>
            </div>
        </footer>
    );
}