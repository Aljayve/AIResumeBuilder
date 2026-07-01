import Badge from "../../ui/badge/Badge";

interface Props {
    status: string;
}

export default function ResumeManagementStatus({
    status,
}: Props) {
    const color =
        status === "published"
            ? "success"
            : status === "draft"
                ? "warning"
                : "error";

    return (
        <Badge size="sm" color={color}>
            {status}
        </Badge>
    );
}