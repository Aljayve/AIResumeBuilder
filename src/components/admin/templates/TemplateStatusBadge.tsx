import Badge from "../../ui/badge/Badge";

interface Props {
    status: string;
}

export default function TemplateStatusBadge({
    status,
}: Props) {
    return (
        <Badge
            size="sm"
            color={status === "active" ? "success" : "error"}
        >
            {status}
        </Badge>
    );
}