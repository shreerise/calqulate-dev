"use client";
import { useState } from "react";

export interface AdminUserRow {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string;
  suspended: boolean;
  created_at: string | null;
  tier: string | null;
  status: string | null;
}

export function UsersTable({ users }: { users: AdminUserRow[] }) {
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  const filtered = users.filter((u) =>
    !q.trim() ? true : `${u.email ?? ""} ${u.full_name ?? ""}`.toLowerCase().includes(q.toLowerCase()),
  );

  async function act(action: string, userId: string, extra?: Record<string, unknown>) {
    setBusy(userId + action);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, userId, ...extra }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error ?? "Action failed.");
        return;
      }
      location.reload();
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by email or name…"
        className="mb-4 w-full max-w-sm rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
      />
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500">
            <tr>
              <th className="px-4 py-2.5 font-medium">Email</th>
              <th className="px-4 py-2.5 font-medium">Role</th>
              <th className="px-4 py-2.5 font-medium">Plan</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5 font-medium">Joined</th>
              <th className="px-4 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-gray-400">No users match.</td></tr>
            )}
            {filtered.map((u) => (
              <tr key={u.id} className="border-t border-gray-100 align-middle">
                <td className="px-4 py-2.5">
                  <div className="font-medium text-gray-800">{u.email ?? "—"}</div>
                  {u.full_name && <div className="text-xs text-gray-400">{u.full_name}</div>}
                </td>
                <td className="px-4 py-2.5">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${u.role === "admin" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-gray-600">{u.tier ?? "free"}</td>
                <td className="px-4 py-2.5 text-gray-600">{u.status ?? "—"}</td>
                <td className="px-4 py-2.5 text-gray-500">{u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}</td>
                <td className="px-4 py-2.5">
                  <div className="flex flex-wrap justify-end gap-1.5">
                    <button
                      onClick={() => act("set-role", u.id, { role: u.role === "admin" ? "user" : "admin" })}
                      disabled={busy === u.id + "set-role"}
                      className="rounded-md border border-gray-200 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                    >
                      {u.role === "admin" ? "Make user" : "Make admin"}
                    </button>
                    <button
                      onClick={() => act(u.tier === "pro" ? "revoke-pro" : "grant-pro", u.id)}
                      disabled={busy === u.id + "grant-pro" || busy === u.id + "revoke-pro"}
                      className="rounded-md border border-emerald-200 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-50 disabled:opacity-50"
                    >
                      {u.tier === "pro" ? "Revoke Pro" : "Grant Pro"}
                    </button>
                    <button
                      onClick={() => { if (confirm(`Permanently delete ${u.email}? This cannot be undone.`)) act("delete-user", u.id); }}
                      disabled={busy === u.id + "delete-user"}
                      className="rounded-md border border-red-200 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
