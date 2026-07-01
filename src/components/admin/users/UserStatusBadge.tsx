import Badge from "../../ui/badge/Badge";

interface Props {
    status: string;
}

export default function UserStatusBadge({ status }: Props) {
    const color =
        status === "active"
            ? "success"
            : status === "inactive"
                ? "error"
                : "warning";

    return (
        <Badge size="sm" color={color}>
            {status}
        </Badge>
    );
}