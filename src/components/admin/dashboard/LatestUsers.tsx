interface User {
    id: string | number;
    name: string;
    email: string;
    avatar?: string;
    joined: string;
}

interface Props {
    users: User[];
}

const avatarColors = [
    "bg-brand-500",
    "bg-success-500",
    "bg-warning-500",
    "bg-error-500",
    "bg-purple-500",
];

function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
}

export default function LatestUsers({ users }: Props) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Latest Users</h3>
                <span className="text-sm text-brand-500 cursor-pointer hover:underline">View All</span>
            </div>

            <div className="space-y-4">
                {users.map((user, i) => (
                    <div key={user.id} className="flex items-center gap-3">
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="h-10 w-10 shrink-0 rounded-full object-cover" />
                        ) : (
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${avatarColors[i % avatarColors.length]}`}>
                                {getInitials(user.name)}
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 dark:text-white/90 truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                        </div>
                        <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">{user.joined}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
