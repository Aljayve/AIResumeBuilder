import { useState } from "react";
import { Upload } from "lucide-react";
import Toggle from "../../ui/Toggle";

interface Props {
    maxFileSize: number;
    allowedFormats: string[];
    enableCompression: boolean;
    onSave?: (data: { maxFileSize: number; allowedFormats: string[]; enableCompression: boolean }) => void;
}

export default function UploadSettingsCard({ maxFileSize, allowedFormats, enableCompression, onSave }: Props) {
    const [size, setSize] = useState(maxFileSize);
    const [formats, setFormats] = useState(allowedFormats);
    const [compress, setCompress] = useState(enableCompression);

    const removeFormat = (fmt: string) => {
        setFormats(formats.filter((f) => f !== fmt));
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                    <Upload size={20} />
                </span>
                <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">Upload Settings</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">File upload limits and formats</p>
                </div>
            </div>

            <div className="mt-5 space-y-4">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Max File Size (MB)</label>
                    <input
                        type="number"
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        className="h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Allowed Formats</label>
                    <div className="flex flex-wrap gap-2">
                        {formats.map((fmt) => (
                            <span
                                key={fmt}
                                className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                            >
                                .{fmt.toLowerCase()}
                                <button onClick={() => removeFormat(fmt)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">&times;</button>
                            </span>
                        ))}
                        <button className="inline-flex items-center rounded-md border border-dashed border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-500 hover:border-brand-500 hover:text-brand-500 dark:border-gray-600 dark:text-gray-400">
                            + Add
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Image Compression</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Auto-compress uploaded images</p>
                    </div>
                    <Toggle label="" checked={compress} onChange={setCompress} />
                </div>
            </div>

            <div className="mt-5 flex justify-end border-t border-gray-100 pt-4 dark:border-gray-800">
                <button onClick={() => onSave?.({ maxFileSize: size, allowedFormats: formats, enableCompression: compress })} className="rounded-lg bg-brand-500 px-5 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors">Save Changes</button>
            </div>
        </div>
    );
}
