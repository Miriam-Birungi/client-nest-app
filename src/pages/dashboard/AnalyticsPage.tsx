import { FaSearch, FaUserCircle, FaHeart, FaChartLine, FaEye, FaCommentDots, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Sidebar from "../../components/Sidebar";

const analyticsStats = [
  {
    label: "Engagement",
    value: "18,397",
    change: "+2.56%",
    icon: <FaChartLine className="text-indigo-500 text-xl" />,
    bg: "bg-indigo-50",
  },
  {
    label: "Likes",
    value: "99,397",
    change: "+2.56%",
    icon: <FaHeart className="text-purple-500 text-xl" />,
    bg: "bg-purple-50",
  },
  {
    label: "Views",
    value: "18,397",
    change: "+2.56%",
    icon: <FaEye className="text-indigo-500 text-xl" />,
    bg: "bg-indigo-50",
  },
  {
    label: "Comments",
    value: "3,397",
    change: "+2.56%",
    icon: <FaCommentDots className="text-purple-500 text-xl" />,
    bg: "bg-purple-50",
  },
];

const followersData = [
  { name: 2, Instagram: 4000, Youtube: 2400, TikTok: 2400 },
  { name: 4, Instagram: 3000, Youtube: 1398, TikTok: 2210 },
  { name: 6, Instagram: 2000, Youtube: 9800, TikTok: 2290 },
  { name: 8, Instagram: 2780, Youtube: 3908, TikTok: 2000 },
  { name: 10, Instagram: 1890, Youtube: 4800, TikTok: 2181 },
  { name: 12, Instagram: 2390, Youtube: 3800, TikTok: 2500 },
  { name: 14, Instagram: 3490, Youtube: 4300, TikTok: 2100 },
  { name: 16, Instagram: 4000, Youtube: 2400, TikTok: 2400 },
  { name: 18, Instagram: 3000, Youtube: 1398, TikTok: 2210 },
  { name: 20, Instagram: 2000, Youtube: 9800, TikTok: 2290 },
  { name: 22, Instagram: 2780, Youtube: 3908, TikTok: 2000 },
  { name: 24, Instagram: 1890, Youtube: 4800, TikTok: 2181 },
];

const profileVisitsData = [
  { name: "Female", value: 60 },
  { name: "Male", value: 40 },
];
const profileVisitsColors = ["#6d28d9", "#fb923c"];

// Engagement heatmap mock data
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Generate mock engagement data: 7 days x 12 months
const engagementData = Array.from({ length: 7 }, () =>
  Array.from({ length: 12 }, () => Math.ceil(Math.random() * 5))
);

const followerSegments = [
  { label: "18 - 24 years old", value: 15873, percent: 80 },
  { label: "25 - 34 years old", value: 7836, percent: 40 },
  { label: "35 - 44 years old", value: 3098, percent: 15 },
  { label: "45 - 54 years old", value: 1200, percent: 8 },
  { label: "55+ years old", value: 600, percent: 4 },
];

const postContentData = [
  {
    title: "AI Fest 2025",
    url: "https://facebook.com/aifest2025",
    date: "27.05.2025",
    views: "198k",
    likes: 4675,
    comments: 276,
    platforms: [<FaFacebook className="text-blue-600" />, <FaLinkedin className="text-blue-700" />],
    thumbnail: "https://randomuser.me/api/portraits/lego/1.jpg",
  },
  {
    title: "AI Fest 2025",
    url: "https://facebook.com/aifest2025",
    date: "27.05.2025",
    views: "198k",
    likes: 4675,
    comments: 276,
    platforms: [<FaFacebook className="text-blue-600" />, <FaInstagram className="text-pink-500" />],
    thumbnail: "https://randomuser.me/api/portraits/lego/2.jpg",
  },
  {
    title: "AI Fest 2025",
    url: "https://facebook.com/aifest2025",
    date: "27.05.2025",
    views: "198k",
    likes: 4675,
    comments: 276,
    platforms: [<FaFacebook className="text-blue-600" />],
    thumbnail: "https://randomuser.me/api/portraits/lego/3.jpg",
  },
];

function getColor(level: number) {
  // 1 (less) to 5 (more)
  switch (level) {
    case 1:
      return "bg-blue-100";
    case 2:
      return "bg-blue-200";
    case 3:
      return "bg-blue-400";
    case 4:
      return "bg-blue-500";
    case 5:
      return "bg-blue-700";
    default:
      return "bg-gray-100";
  }
}

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-[#f9fafe]">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-8 ml-0 lg:ml-64">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold mb-1">Analytics</h1>
            <p className="text-gray-500 text-sm">Summary of your social media traffic.</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Avatars */}
            <div className="flex -space-x-2">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User1" className="w-8 h-8 rounded-full border-2 border-white" />
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User2" className="w-8 h-8 rounded-full border-2 border-white" />
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold border-2 border-white text-sm">+3</div>
            </div>
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-sm bg-white"
              />
              <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            </div>
            {/* Settings/Profile Icon */}
            <button className="bg-white p-2 rounded-full border border-gray-200 hover:bg-indigo-50">
              <FaUserCircle className="text-2xl text-gray-500" />
            </button>
          </div>
        </div>
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {analyticsStats.map((stat) => (
            <div key={stat.label} className={`flex items-center gap-4 p-4 rounded-xl shadow bg-white border-t-4 ${stat.bg}`}>
              <div className={`p-3 rounded-full ${stat.bg}`}>{stat.icon}</div>
              <div>
                <div className="text-xs text-gray-500 font-semibold mb-1">{stat.label}</div>
                <div className="text-xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs font-semibold text-green-600 flex items-center gap-1">
                  <span>{stat.change}</span>
                  <span>▲</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Your Followers Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Your Followers Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-lg">Your Followers</div>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-pink-500 inline-block"></span> Instagram</div>
                  <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-400 inline-block"></span> Youtube</div>
                  <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-700 inline-block"></span> TikTok</div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={followersData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="Instagram" stroke="#ec4899" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Youtube" stroke="#60a5fa" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="TikTok" stroke="#7c3aed" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Profile Visits Section */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center justify-center h-full relative">
              <div className="font-semibold text-lg mb-4">Profile Visits</div>
              <div className="relative flex items-center justify-center w-[180px] h-[180px]">
                <PieChart width={180} height={180}>
                  <Pie
                    data={profileVisitsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {profileVisitsData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={profileVisitsColors[index % profileVisitsColors.length]} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">100%</div>
              </div>
              <div className="flex justify-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block" style={{ background: profileVisitsColors[0] }}></span> Female</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block" style={{ background: profileVisitsColors[1] }}></span> Male</div>
              </div>
            </div>
          </div>
        </div>
        {/* Engagement Heatmap & Follower Segmentation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Engagement Heatmap Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow mb-8 lg:mb-0">
              <div className="font-semibold text-lg mb-2">Engagement</div>
              <div className="flex items-center gap-2 mb-4 text-xs">
                <span>Less</span>
                <span className="w-4 h-4 rounded bg-blue-100 inline-block"></span>
                <span className="w-4 h-4 rounded bg-blue-400 inline-block"></span>
                <span className="w-4 h-4 rounded bg-blue-700 inline-block"></span>
                <span>More</span>
              </div>
              <div className="overflow-x-auto">
                <table className="table-fixed border-collapse">
                  <thead>
                    <tr>
                      <th className="w-12"></th>
                      {months.map((month) => (
                        <th key={month} className="px-2 pb-2 text-xs font-semibold text-gray-500">{month}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {days.map((day, i) => (
                      <tr key={day}>
                        <td className="pr-2 text-xs font-semibold text-gray-500">{day}</td>
                        {engagementData[i].map((level, j) => (
                          <td key={j} className="px-1 py-1">
                            <div className={`w-4 h-4 rounded ${getColor(level)}`}></div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Follower Segmentation Section */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow h-full flex flex-col justify-between">
              <div>
                <div className="font-semibold text-lg mb-4">Follower Segmentation</div>
                <div className="flex flex-col gap-4">
                  {followerSegments.map((seg, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500 font-semibold">{seg.label}</span>
                        <span className="font-semibold">{seg.value.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${seg.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Post Content Table Section */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-white rounded-xl p-6 shadow-lg mb-8 border-t-4 border-indigo-400">
          <div className="font-semibold text-lg mb-4 text-indigo-700 flex items-center gap-2">
            <FaChartLine className="text-indigo-500" /> Post Content
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm shadow rounded-xl overflow-hidden">
              <thead>
                <tr className="text-left text-indigo-600 font-semibold border-b border-indigo-100 bg-indigo-50">
                  <th className="py-2 rounded-tl-lg">Post Content</th>
                  <th className="py-2">Available Dates</th>
                  <th className="py-2">Views</th>
                  <th className="py-2">Likes</th>
                  <th className="py-2">Comments</th>
                  <th className="py-2 rounded-tr-lg">Platforms</th>
                </tr>
              </thead>
              <tbody>
                {postContentData.map((post, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors duration-150 ${idx % 2 === 0 ? 'bg-white' : 'bg-purple-50'} hover:bg-indigo-50`}
                  >
                    <td className="py-2 flex items-center gap-3 rounded-l-lg">
                      <img src={post.thumbnail} alt="thumb" className="w-10 h-10 rounded object-cover border-2 border-indigo-100" />
                      <div>
                        <div className="font-semibold text-gray-800 truncate max-w-[120px]">{post.title}</div>
                        <a href={post.url} className="text-indigo-600 text-xs truncate max-w-[120px] hover:underline" target="_blank" rel="noopener noreferrer">{post.url}</a>
                      </div>
                    </td>
                    <td className="py-2">{post.date}</td>
                    <td className="py-2 text-indigo-700 font-semibold">{post.views}</td>
                    <td className="py-2 text-pink-600 font-semibold">{post.likes}</td>
                    <td className="py-2 text-purple-700 font-semibold">{post.comments}</td>
                    <td className="py-2 flex gap-2 items-center rounded-r-lg">
                      {post.platforms.map((icon, i) => (
                        <span key={i} className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 border border-indigo-200 shadow-sm">{icon}</span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* The rest of the analytics page will go here */}
      </main>
    </div>
  );
}
