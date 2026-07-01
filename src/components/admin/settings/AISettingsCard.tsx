import { Sparkles, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useState, useCallback } from "react";
import Toggle from "../../ui/Toggle";

interface Props {
    provider: string;
    apiKey: string;
    enabled: boolean;
    customBaseUrl?: string;
    customModel?: string;
    onSave?: (data: {
        aiProvider: string;
        aiApiKey: string;
        aiEnabled: boolean;
        aiCustomBaseUrl?: string;
        aiCustomModel?: string;
    }) => void;
}

const PROVIDERS = ["OpenAI", "Anthropic", "Google", "Other"];

function isValidUrl(str: string) {
    try {
        const u = new URL(str);
        return u.protocol === "http:" || u.protocol === "https:";
    } catch {
        return false;
    }
}

export default function AISettingsCard({ provider, apiKey, enabled, customBaseUrl, customModel, onSave }: Props) {
    const [showKey, setShowKey] = useState(false);
    const [prov, setProv] = useState(provider === "Other" ? "Other" : PROVIDERS.includes(provider) ? provider : "Other");
    const [key, setKey] = useState(apiKey);
    const [enab, setEnab] = useState(enabled);
    const [baseUrl, setBaseUrl] = useState(customBaseUrl ?? "");
    const [model, setModel] = useState(customModel ?? "");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const isOther = prov === "Other";

    const validate = useCallback(() => {
        const errs: Record<string, string> = {};
        if (enab && !key.trim()) {
            errs.apiKey = "API key is required when AI is enabled";
        }
        if (isOther) {
            if (!baseUrl.trim()) {
                errs.baseUrl = "API Base URL is required";
            } else if (!isValidUrl(baseUrl.trim())) {
                errs.baseUrl = "Enter a valid URL (e.g. https://api.groq.com/openai/v1)";
            }
            if (!model.trim()) {
                errs.model = "Model name is required";
            }
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    }, [enab, key, isOther, baseUrl, model]);

    const handleSave = () => {
        if (!validate()) return;
        onSave?.({
            aiProvider: isOther ? "Other" : prov,
            aiApiKey: key,
            aiEnabled: enab,
            ...(isOther ? { aiCustomBaseUrl: baseUrl.trim(), aiCustomModel: model.trim() } : {}),
        });
    };

    const inputClass = (field: string, extra = "") =>
        `h-10 w-full rounded-lg border bg-transparent px-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:text-white/90 dark:placeholder:text-white/30 ${
            errors[field]
                ? "border-error-500 focus:border-error-500 focus:ring-error-500/10"
                : "border-gray-200 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-800"
        } ${extra}`;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                    <Sparkles size={20} />
                </span>
                <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">AI Settings</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">AI provider and features</p>
                </div>
            </div>

            <div className="mt-5 space-y-4">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Provider</label>
                    <select
                        value={prov}
                        onChange={(e) => { setProv(e.target.value); setErrors({}); }}
                        className={inputClass("provider", "dark:[color-scheme:dark]")}
                    >
                        {PROVIDERS.map((p) => (
                            <option key={p} className="dark:bg-gray-800 dark:text-white" value={p}>{p}</option>
                        ))}
                    </select>
                </div>

                {isOther && (
                    <>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                API Base URL <span className="text-xs text-gray-400">(e.g. https://api.groq.com/openai/v1)</span>
                            </label>
                            <input
                                type="text"
                                value={baseUrl}
                                onChange={(e) => { setBaseUrl(e.target.value); setErrors({}); }}
                                placeholder="https://api.groq.com/openai/v1"
                                className={inputClass("baseUrl")}
                            />
                            {errors.baseUrl && (
                                <p className="mt-1 flex items-center gap-1 text-xs text-error-500">
                                    <AlertCircle size={12} /> {errors.baseUrl}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Model <span className="text-xs text-gray-400">(e.g. llama3-70b-8192)</span>
                            </label>
                            <input
                                type="text"
                                value={model}
                                onChange={(e) => { setModel(e.target.value); setErrors({}); }}
                                placeholder="llama3-70b-8192"
                                className={inputClass("model")}
                            />
                            {errors.model && (
                                <p className="mt-1 flex items-center gap-1 text-xs text-error-500">
                                    <AlertCircle size={12} /> {errors.model}
                                </p>
                            )}
                        </div>
                    </>
                )}

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">API Key</label>
                    <div className="relative">
                        <input
                            type={showKey ? "text" : "password"}
                            value={key}
                            onChange={(e) => { setKey(e.target.value); setErrors({}); }}
                            className={inputClass("apiKey", "pr-10")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowKey(!showKey)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {errors.apiKey && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-error-500">
                            <AlertCircle size={12} /> {errors.apiKey}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Enabled</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Enable AI-powered resume suggestions</p>
                    </div>
                    <Toggle label="" checked={enab} onChange={setEnab} />
                </div>
            </div>

            <div className="mt-5 flex justify-end border-t border-gray-100 pt-4 dark:border-gray-800">
                <button
                    onClick={handleSave}
                    className="rounded-lg bg-brand-500 px-5 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
