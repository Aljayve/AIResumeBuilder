import TemplateCard from "./TemplateCard";

export interface TemplateItem {
    _id: string;
    title: string;
    slug: string;
    category: string;
    description: string;
    premium: boolean;
}

interface Props {
    templates: TemplateItem[];
}

export default function TemplateGrid({ templates }: Props) {
    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {templates.map((template) => (
                <TemplateCard
                    key={template._id}
                    title={template.title}
                    slug={template.slug}
                    category={template.category}
                    description={template.description}
                    premium={template.premium}
                />
            ))}
        </div>
    );
}
