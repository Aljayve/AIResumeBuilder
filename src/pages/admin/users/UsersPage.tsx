import { useEffect, useMemo, useState } from "react";
import { Users, UserCheck, UserX, Shield } from "lucide-react";

import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";

import UserStats from "../../../components/admin/users/UserStats";
import UserToolbar from "../../../components/admin/users/UserToolbar";
import UserTable from "../../../components/admin/users/UserTable";

import { adminApi, type AdminUser } from "../../../api/admin.api";

function toLocalDate(iso: string) {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function UsersPage() {
    const [allUsers, setAllUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    useEffect(() => {
        adminApi.getUsers()
            .then((res) => setAllUsers(res.data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const filteredUsers = useMemo(() => {
        return allUsers.filter((user) => {
            const matchesSearch = !search.trim() ||
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase());
            const matchesRole = roleFilter === "all" || user.role === roleFilter;
            return matchesSearch && matchesRole;
        });
    }, [search, roleFilter, allUsers]);

    const usersForTable = useMemo(() =>
        filteredUsers.map((u) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            status: u.status,
            avatar: u.avatar,
            resumes: u.resumes,
            exports: u.exports,
            createdAt: toLocalDate(u.createdAt),
        })),
        [filteredUsers]
    );

    const activeUsers = allUsers.filter((u) => u.status === "active").length;
    const inactiveUsers = allUsers.filter((u) => u.status === "inactive").length;
    const admins = allUsers.filter((u) => u.role === "admin").length;

    if (loading) {
        return (
            <>
                <PageMeta title="Users Management" description="Manage users" />
                <PageBreadcrumb pageTitle="Users" />
                <p className="text-gray-500 dark:text-gray-400">Loading users...</p>
            </>
        );
    }

    return (
        <>
            <PageMeta title="Users Management" description="Manage users" />
            <PageBreadcrumb pageTitle="Users" />

            <div className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <UserStats title="Total Users" value={allUsers.length} icon={<Users size={22} />} color="brand" />
                    <UserStats title="Active Users" value={activeUsers} icon={<UserCheck size={22} />} color="success" />
                    <UserStats title="Inactive Users" value={inactiveUsers} icon={<UserX size={22} />} color="error" />
                    <UserStats title="Admins" value={admins} icon={<Shield size={22} />} color="warning" />
                </div>

                <UserToolbar
                    search={search}
                    onSearchChange={setSearch}
                    roleFilter={roleFilter}
                    onRoleFilterChange={setRoleFilter}
                />

                <UserTable users={usersForTable} />
            </div>
        </>
    );
}
