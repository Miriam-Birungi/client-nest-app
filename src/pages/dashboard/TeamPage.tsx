import { useMemo, useState } from "react";
import { FaSearch, FaUserPlus, FaTrash, FaUserShield, FaCrown } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";

type Role = "Owner" | "Admin" | "Editor" | "Viewer";

type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: Role;
  avatarUrl: string;
  status: "Active" | "Suspended";
};

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Miriam Birungi",
      email: "miriam@yahoo.com",
      role: "Owner",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      status: "Active",
    },
    {
      id: 2,
      name: "Jordan Smith",
      email: "jordan@example.com",
      role: "Admin",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      status: "Active",
    },
    {
      id: 3,
      name: "Aisha Khan",
      email: "aisha@example.com",
      role: "Editor",
      avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
      status: "Active",
    },
    {
      id: 4,
      name: "Diego López",
      email: "diego@example.com",
      role: "Viewer",
      avatarUrl: "https://randomuser.me/api/portraits/men/76.jpg",
      status: "Active",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<Role>("Viewer");

  const filteredMembers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q));
  }, [members, searchQuery]);

  const addMember = () => {
    const email = newEmail.trim();
    if (!email) return;
    const nameFromEmail = email.split("@")[0].replace(/\./g, " ");
    const newMember: TeamMember = {
      id: Date.now(),
      name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
      email,
      role: newRole,
      avatarUrl: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(nameFromEmail)}`,
      status: "Active",
    };
    setMembers((prev) => [newMember, ...prev]);
    setNewEmail("");
    setNewRole("Viewer");
  };

  const removeMember = (id: number) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const changeRole = (id: number, role: Role) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)));
  };

  return (
    <div className="flex min-h-screen bg-[#f9fafe]">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-8 ml-0 lg:ml-64">
        {/* Header Section (similar to Analytics) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Team Management</h1>
            <p className="text-gray-500 text-sm">Manage members, roles, and access to your workspace.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search team"
                className="pl-8 pr-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-sm bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Invite Member */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-lg font-semibold">Invite a member</div>
              <div className="text-sm text-gray-500">Send an invitation by email and choose a role.</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="email"
              placeholder="member@example.com"
              className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <select
              className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as Role)}
            >
              <option value="Viewer">Viewer</option>
              <option value="Editor">Editor</option>
              <option value="Admin">Admin</option>
              <option value="Owner">Owner</option>
            </select>
            <button
              onClick={addMember}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <FaUserPlus />
              Invite
            </button>
          </div>
        </div>

        {/* Members List */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-semibold">Team members ({filteredMembers.length})</div>
            <div className="text-xs text-gray-500">Roles: Owner, Admin, Editor, Viewer</div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2 pr-4 font-medium">Member</th>
                  <th className="py-2 px-4 font-medium">Role</th>
                  <th className="py-2 px-4 font-medium">Status</th>
                  <th className="py-2 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="border-b last:border-0">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <img src={m.avatarUrl} alt={m.name} className="w-9 h-9 rounded-full" />
                        <div>
                          <div className="font-medium text-gray-900">{m.name}</div>
                          <div className="text-gray-500 text-xs">{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="inline-flex items-center gap-2">
                        {m.role === "Owner" && <FaCrown className="text-amber-500" />}
                        {m.role === "Admin" && <FaUserShield className="text-indigo-600" />}
                        <select
                          value={m.role}
                          onChange={(e) => changeRole(m.id, e.target.value as Role)}
                          className="px-2 py-1 rounded border border-gray-300 bg-white"
                        >
                          <option value="Viewer">Viewer</option>
                          <option value="Editor">Editor</option>
                          <option value="Admin">Admin</option>
                          <option value="Owner">Owner</option>
                        </select>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          m.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => removeMember(m.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <FaTrash />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
