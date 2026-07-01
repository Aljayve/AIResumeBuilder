import { useState } from "react";
import { Shield } from "lucide-react";
import Toggle from "../../ui/Toggle";

interface Props {
    allowRegistration: boolean;
    requireEmailVerification: boolean;
    enableTwoFactor: boolean;
    onSave?: (data: { allowRegistration: boolean; requireEmailVerification: boolean; enableTwoFactor: boolean }) => void;
}

export default function SecuritySettingsCard({ allowRegistration, requireEmailVerification, enableTwoFactor, onSave }: Props) {
    const [registration, setRegistration] = useState(allowRegistration);
    const [emailVerif, setEmailVerif] = useState(requireEmailVerification);
    const [twoFactor, setTwoFactor] = useState(enableTwoFactor);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                    <Shield size={20} />
                </span>
                <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">Security Settings</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Authentication and access control</p>
                </div>
            </div>

            <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Allow Registration</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Let new users sign up</p>
                    </div>
                    <Toggle label="" checked={registration} onChange={setRegistration} />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Verification</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Require email confirmation</p>
                    </div>
                    <Toggle label="" checked={emailVerif} onChange={setEmailVerif} />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Two-Factor Auth</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Extra security layer for admins</p>
                    </div>
                    <Toggle label="" checked={twoFactor} onChange={setTwoFactor} />
                </div>
            </div>

            <div className="mt-5 flex justify-end border-t border-gray-100 pt-4 dark:border-gray-800">
                <button onClick={() => onSave?.({ allowRegistration: registration, requireEmailVerification: emailVerif, enableTwoFactor: twoFactor })} className="rounded-lg bg-brand-500 px-5 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors">Save Changes</button>
            </div>
        </div>
    );
}
