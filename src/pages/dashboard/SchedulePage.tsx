import { useState, useRef } from "react";
import type { ReactElement } from "react";
import { FaChevronLeft, FaChevronRight, FaTwitter, FaLinkedin, FaDribbble, FaSearch, FaUser, FaPlus, FaTimes, FaCalendarAlt, FaRegSmile, FaHashtag, FaRobot, FaInstagram } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import HashtagSuggestionModal from "./HashtagSuggestionModal";
import AddAccountModal from "./AddAccountModal";

const platforms: Record<string, { icon: ReactElement; color: string }> = {
  twitter: { icon: <FaTwitter className="text-sky-500" />, color: "bg-yellow-100 border-yellow-300 text-sky-700" },
  linkedin: { icon: <FaLinkedin className="text-blue-700" />, color: "bg-blue-100 border-blue-300 text-blue-800" },
  dribbble: { icon: <FaDribbble className="text-pink-400" />, color: "bg-pink-100 border-pink-300 text-pink-600" },
};

const weekDays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const timeSlots = [
  "8 AM", "8:30 AM", "9 AM", "9:30 AM", "10 AM", "10:30 AM", "11 AM", "11:30 AM", "12 PM"
];

// Each event has a start and end index for the timeSlots array
const events = [
  { id: 1, day: 1, start: 0, end: 2, platform: "dribbble", title: "Dribbble Post" },
  { id: 2, day: 1, start: 2, end: 4, platform: "twitter", title: "Twitter Post" },
  { id: 3, day: 2, start: 1, end: 3, platform: "linkedin", title: "Linkedin Post" },
  { id: 4, day: 3, start: 0, end: 2, platform: "twitter", title: "Twitter Post" },
  { id: 5, day: 4, start: 3, end: 5, platform: "twitter", title: "Twitter Post" },
  { id: 6, day: 5, start: 2, end: 4, platform: "dribbble", title: "Dribbble Post" },
];

export default function SchedulePage() {
  const [view, setView] = useState("Week");
  const [showModal, setShowModal] = useState(false);
  const [showHashtagModal, setShowHashtagModal] = useState(false);
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [month] = useState("February");
  const [year] = useState(2023);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
      // You can add logic here to handle the file upload
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 pt-4 px-8 pb-8 ml-0 lg:ml-64">
        {/* Modern Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Schedule Calendar</h1>
            <p className="text-gray-500 text-sm">Plan and manage your content schedule</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Team Avatars */}
            <div className="flex -space-x-2">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Team Member 1" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Team Member 2" className="w-8 h-8 rounded-full border-2 border-white" />
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold border-2 border-white text-sm">+3</div>
            </div>
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                className="pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-sm bg-white"
              />
              <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            </div>
            {/* Create Post Button */}
            <button
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              onClick={() => setShowModal(true)}
            >
              <FaPlus />
              Create Post
            </button>
            {/* Profile Icon */}
            <button className="bg-white p-2 rounded-full border border-gray-200 hover:bg-indigo-50">
              <FaUser className="text-xl text-gray-500" />
            </button>
          </div>
        </div>
        {/* Header (Month/Year, Navigation, View Toggle) */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">{month} {year}</h1>
            <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium">Today</button>
            <button className="p-2 hover:bg-gray-200 rounded-lg"><FaChevronLeft /></button>
            <button className="p-2 hover:bg-gray-200 rounded-lg"><FaChevronRight /></button>
          </div>
          <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
            {['Day', 'Week', 'Month', 'Year'].map(v => (
              <button
                key={v}
                className={`px-3 py-1 rounded text-sm font-medium transition ${view === v ? 'bg-white shadow text-gray-900' : 'text-gray-600'}`}
                onClick={() => setView(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        {/* Week View Calendar Grid */}
        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <div className="grid grid-cols-8 border-b">
            <div className="text-xs text-gray-400 p-2"></div>
            {weekDays.map(day => (
              <div key={day} className="text-center text-xs text-gray-500 font-semibold p-2">{day}</div>
            ))}
          </div>
          <div className="relative" style={{ minHeight: `${timeSlots.length * 60}px` }}>
            {/* Time slots */}
            <div className="absolute left-0 top-0 w-16 flex flex-col">
              {timeSlots.map((slot) => (
                <div key={slot} className="h-16 flex items-start justify-end pr-2 text-xs text-gray-400 border-b">
                  {slot}
                </div>
              ))}
            </div>
            {/* Calendar grid */}
            <div className="ml-16 grid grid-cols-7" style={{ minHeight: `${timeSlots.length * 60}px` }}>
              {weekDays.map((_, colIdx) => (
                <div key={colIdx} className="relative border-l">
                  {/* Render event blocks for this day */}
                  {events.filter(e => e.day === colIdx).map(e => (
                    <div
                      key={e.id}
                      className={`absolute left-2 right-2 ${platforms[e.platform].color} border rounded-xl shadow-sm p-2 flex flex-col gap-1`}
                      style={{ top: `${e.start * 64}px`, height: `${(e.end - e.start) * 64 - 8}px` }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {platforms[e.platform].icon}
                        <span className="font-semibold text-xs">{e.title}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {timeSlots[e.start]} - {timeSlots[e.end]}
                      </div>
                    </div>
                  ))}
                  {/* Render grid lines */}
                  {timeSlots.map((_) => (
                    <div key={_} className="h-16 border-b"></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Add Schedule Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-[800px] max-h-[90vh] overflow-y-auto border border-gray-100 relative">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="w-2 h-4 bg-indigo-400 rounded-sm"></span>
                  Schedule Post
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-red-500 transition-colors rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  aria-label="Close schedule post popup"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              <div className="p-8">
                {/* Account Selection Row */}
                <div className="flex gap-3 mb-6">
                  <button className="flex items-center gap-2 px-4 py-2 border-2 border-blue-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border"><FaInstagram className="text-orange-500 text-xl" /></div>
                    <div className="text-left">
                      <div className="text-sm font-medium">@WeCraft_Studio</div>
                      <div className="text-xs text-gray-500">Instagram</div>
                    </div>
                    <span className="ml-2 text-gray-400">▼</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white focus:outline-none shadow-sm">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border"><FaInstagram className="text-sky-900 text-xl" /></div>
                    <div className="text-left">
                      <div className="text-sm font-medium">@Nimu_Studio</div>
                      <div className="text-xs text-gray-500">Instagram</div>
                    </div>
                    <span className="ml-2 text-gray-400">▼</span>
                  </button>
                  <button
                    className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:text-blue-600 focus:outline-none font-semibold"
                    onClick={() => setShowAddAccountModal(true)}
                  >
                    + Add Account
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-6 mb-6">
                  {/* Upload Area */}
                  <div className="col-span-2 border-2 border-dashed rounded-lg flex flex-col items-center justify-center bg-gray-50 p-4 aspect-square w-full max-w-[180px] mx-auto">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*,video/*"
                    />
                    <div className="flex flex-col items-center gap-2">
                      <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#F3F4F6" /><path d="M16 9v14M9 16h14" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" /></svg>
                      <p className="text-xs text-gray-500">Choose a file or drag it here</p>
                      <button
                        className="mt-2 px-3 py-1.5 bg-white border rounded-lg text-xs font-semibold shadow hover:bg-gray-100"
                        onClick={handleUploadClick}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                  {/* Caption/Toolbar/Tag/Location */}
                  <div className="col-span-3 flex flex-col gap-3">
                    <textarea
                      placeholder="Write a caption..."
                      className="w-full h-40 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white text-base"
                      aria-label="Write a caption"
                    ></textarea>
                    <div className="flex gap-4 text-gray-400 text-sm items-center border-t border-b py-2 px-1">
                      <button className="flex items-center gap-1 hover:text-blue-500 focus:outline-none"><FaRegSmile /> Saved Captions</button>
                      <span>|</span>
                      <button className="flex items-center gap-1 hover:text-blue-500 focus:outline-none" onClick={() => setShowHashtagModal(true)}><FaHashtag /> Hashtag Suggestions</button>
                      <span>|</span>
                      <button className="flex items-center gap-1 hover:text-blue-500 focus:outline-none"><FaRobot /> AI Caption Writer</button>
                    </div>
                    <input type="text" placeholder="Tag people" className="w-full border rounded-lg px-4 py-2 text-sm bg-white" aria-label="Tag people" />
                    <input type="text" placeholder="Add location" className="w-full border rounded-lg px-4 py-2 text-sm bg-white" aria-label="Add location" />
                  </div>
                </div>
                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t mt-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 border rounded-lg bg-white font-semibold hover:bg-gray-100"
                    aria-label="Discard Post"
                  >
                    Discard Post
                  </button>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white text-gray-700 font-semibold"><FaCalendarAlt /> Now</button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Post Now</button>
                  </div>
                </div>
              </div>
              <HashtagSuggestionModal open={showHashtagModal} onClose={() => setShowHashtagModal(false)} />
              <AddAccountModal open={showAddAccountModal} onClose={() => setShowAddAccountModal(false)} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
