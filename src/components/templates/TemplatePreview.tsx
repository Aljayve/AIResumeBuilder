import { templateImageMap, getTemplateImageSrc } from "../../constants/templateImages";

interface Props {
    slug: string;
    title: string;
}

export default function TemplatePreview({ slug, title }: Props) {
    const src = getTemplateImageSrc(slug);

    if (src) {
        return (
            <img
                src={src}
                alt={title}
                className="h-full w-full object-cover"
            />
        );
    }

    return <FallbackPlaceholder title={title} />;
}

function FallbackPlaceholder({ title }: { title: string }) {
    return (
        <svg viewBox="0 0 160 210" fill="none" className="h-full w-full">
            <rect width="160" height="210" rx="4" fill="white" className="dark:fill-gray-900" />
            <text x="80" y="30" textAnchor="middle" fontSize="10" fill="#667085" className="dark:fill-gray-400">{title}</text>
            <rect x="20" y="46" width="80" height="5" rx="2.5" fill="#1D2939" className="dark:fill-white/80" />
            <rect x="20" y="56" width="50" height="2" rx="1" fill="#D0D5DD" className="dark:fill-gray-600" />
            <rect x="20" y="76" width="120" height="1" stroke="#D0D5DD" strokeWidth="1" className="dark:stroke-gray-700" />
            <rect x="20" y="90" width="30" height="2" rx="1" fill="#667085" className="dark:fill-gray-400" />
            <rect x="20" y="100" width="90" height="1.5" rx="0.75" fill="#E4E7EC" className="dark:fill-gray-700" />
            <rect x="20" y="108" width="100" height="1.5" rx="0.75" fill="#E4E7EC" className="dark:fill-gray-700" />
            <rect x="20" y="124" width="30" height="2" rx="1" fill="#667085" className="dark:fill-gray-400" />
            <rect x="20" y="134" width="80" height="1.5" rx="0.75" fill="#E4E7EC" className="dark:fill-gray-700" />
            <rect x="20" y="142" width="70" height="1.5" rx="0.75" fill="#E4E7EC" className="dark:fill-gray-700" />
            <rect x="20" y="158" width="30" height="2" rx="1" fill="#667085" className="dark:fill-gray-400" />
            <rect x="20" y="168" width="60" height="1.5" rx="0.75" fill="#E4E7EC" className="dark:fill-gray-700" />
            <rect x="20" y="176" width="50" height="1.5" rx="0.75" fill="#E4E7EC" className="dark:fill-gray-700" />
        </svg>
    );
}
