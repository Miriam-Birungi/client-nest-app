
import { useState } from "react";
import { NavLink } from "react-router-dom";
import ConnectSocialModal from "./ConnectSocialModal";

const menuItems = [
  { label: "Dashboard", icon: "🏠", path: "/dashboard" },
  { label: "Socials", icon: "👤" },
  { label: "Analytics", icon: "📊", path: "/analytics" },
  { label: "Schedule Calendar", icon: "🗓️", path: "/schedule" },
  { label: "Reports", icon: "📄" },
  { label: "Team Collaboration", icon: "👥" },
  { label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  const [showConnectModal, setShowConnectModal] = useState(false);
  return (
    <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-[#f4f6fa] p-6 flex-col z-20 overflow-y-auto max-h-screen">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">CN</div>
        <span className="font-bold text-xl">Client<span className="text-indigo-600">Nest</span></span>
      </div>
      {/* User Info */}
      <div className="flex items-center gap-3 mb-8">
        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-10 h-10 rounded-full" />
        <div>
          <div className="font-semibold text-sm">Miriam Birungi</div>
          <div className="text-xs text-gray-500">miriam@yahoo.com</div>
        </div>
      </div>
      {/* Menu */}
      <nav className="flex flex-col gap-2 flex-1">
        {menuItems.map((item) => {
          if (item.label === "Socials") {
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm cursor-pointer text-gray-700 hover:bg-indigo-50 transition"
                onClick={() => setShowConnectModal(true)}
              >
                <span>{item.icon}</span>
                {item.label}
              </div>
            );
          }
          if (item.path) {
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm cursor-pointer transition ${
                    isActive ? "bg-indigo-100 text-indigo-700" : "text-gray-700 hover:bg-indigo-50"
                  }`
                }
              >
                <span>{item.icon}</span>
                {item.label}
              </NavLink>
            );
          }
          return (
            <div
              key={item.label}
              className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm text-gray-700 cursor-pointer hover:bg-indigo-50 transition"
            >
              <span>{item.icon}</span>
              {item.label}
            </div>
          );
        })}
      </nav>
      {/* Upgrade Card */}
      <div className="mt-8 bg-white rounded-xl p-4 shadow text-center">
        <div className="flex justify-center mb-2">
          <span className="text-indigo-600 text-2xl">★</span>
        </div>
        <div className="font-semibold mb-1">Upgrade Your Plan</div>
        <div className="text-xs text-gray-500 mb-3">Enjoy more advanced features by upgrading to an enterprise plan.</div>
        <button className="w-full bg-indigo-600 text-white rounded-lg py-1.5 font-semibold mb-2">Upgrade Plan</button>
        <button className="w-full border border-indigo-600 text-indigo-600 rounded-lg py-1.5 font-semibold">View Pricing</button>
      </div>
      <ConnectSocialModal open={showConnectModal} onClose={() => setShowConnectModal(false)} />
    </aside>
  );
}

