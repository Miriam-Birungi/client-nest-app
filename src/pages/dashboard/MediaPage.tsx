import { useMemo, useRef, useState, useCallback } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";

export default function MediaPage() {
  type MediaType = "image" | "video" | "document";
  type MediaItem = {
    id: number;
    name: string;
    type: MediaType;
    url: string;
    size: string;
    uploadedAt: string;
    tags: string[];
  };

  // Initial sample media data - in a real app this would come from an API
  const initialMediaItems: MediaItem[] = [
    {
      id: 1,
      name: "Product Launch",
      type: "image",
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      size: "2.4 MB",
      uploadedAt: "2024-01-15",
      tags: ["product", "launch"]
    },
    {
      id: 2,
      name: "Team Meeting",
      type: "image",
      url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
      size: "1.8 MB",
      uploadedAt: "2024-01-14",
      tags: ["team", "meeting"]
    },
    {
      id: 3,
      name: "Office Space",
      type: "image",
      url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      size: "3.2 MB",
      uploadedAt: "2024-01-13",
      tags: ["office", "workspace"]
    },
    {
      id: 4,
      name: "Marketing Campaign",
      type: "image",
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      size: "2.1 MB",
      uploadedAt: "2024-01-12",
      tags: ["marketing", "campaign"]
    },
    {
      id: 5,
      name: "Customer Success",
      type: "image",
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      size: "1.9 MB",
      uploadedAt: "2024-01-11",
      tags: ["customer", "success"]
    },
    {
      id: 6,
      name: "Brand Guidelines.pdf",
      type: "document",
      url: "",
      size: "820 KB",
      uploadedAt: "2024-01-10",
      tags: ["brand", "pdf"]
    },
    {
      id: 7,
      name: "Promo Video.mp4",
      type: "video",
      url: "",
      size: "24.1 MB",
      uploadedAt: "2024-01-09",
      tags: ["promo", "video"]
    }
  ];

  const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialMediaItems);
  const [activeType, setActiveType] = useState<"all" | MediaType>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const formatFileSize = (bytes: number) => {
    if (!Number.isFinite(bytes)) return "";
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  const detectTypeFromMime = (mime: string): MediaType => {
    if (mime.startsWith("image/")) return "image";
    if (mime.startsWith("video/")) return "video";
    return "document";
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFiles = useCallback((fileList: FileList) => {
    const files = Array.from(fileList);
    const now = new Date();
    const newItems: MediaItem[] = files.map((file, index) => {
      const type = detectTypeFromMime(file.type);
      return {
        id: Date.now() + index,
        name: file.name,
        type,
        url: URL.createObjectURL(file),
        size: formatFileSize(file.size),
        uploadedAt: now.toISOString().slice(0, 10),
        tags: []
      };
    });
    setMediaItems((prev) => [...newItems, ...prev]);
  }, []);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
      // reset input to allow re-uploading same file name
      e.target.value = "";
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const filteredItems = useMemo(() => {
    return mediaItems.filter((item) => {
      const matchesType = activeType === "all" ? true : item.type === activeType;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery = query
        ? item.name.toLowerCase().includes(query) || item.tags.some((t) => t.toLowerCase().includes(query))
        : true;
      return matchesType && matchesQuery;
    });
  }, [mediaItems, activeType, searchQuery]);

  return (
    <div className="flex min-h-screen bg-[#f9fafe]">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-8 ml-0 lg:ml-64">
        
        {/* Header Section (match Analytics style) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold mb-1">Media Library</h1>
            <p className="text-gray-500 text-sm">Manage and organize your media assets.</p>
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

        {/* Upload Section */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Upload Media</h2>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              onClick={handleBrowseClick}
            >
              Upload Files
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
            className="hidden"
            onChange={onFileInputChange}
          />
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
              isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
            }`}
            onClick={handleBrowseClick}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <div className="text-gray-400 text-4xl mb-4">📁</div>
            <p className="text-gray-600 mb-2">Drag and drop files here or click to browse</p>
            <p className="text-sm text-gray-500">Supports: JPG, PNG, GIF, MP4, MOV, PDF, DOCX (Max 50MB)</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeType === "all" ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveType("all")}
              >
                All Media
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeType === "image" ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveType("image")}
              >
                Images
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeType === "video" ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveType("video")}
              >
                Videos
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeType === "document" ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveType("document")}
              >
                Documents
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search media..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">All Media ({filteredItems.length})</h2>
            <div className="flex gap-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">📋</button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">🔲</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="group relative bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition">
                <div className="aspect-square relative">
                  {item.type === "image" && item.url ? (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="text-center">
                        <div className="text-4xl mb-2">{item.type === "video" ? "🎞️" : "📄"}</div>
                        <div className="text-sm text-gray-600 px-2 truncate max-w-[12rem] mx-auto">{item.name}</div>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                      <button className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100">
                        👁️
                      </button>
                      <button className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100">
                        ✏️
                      </button>
                      <button className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100">
                        📋
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1 truncate">{item.name}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{item.size}</span>
                    <span>{item.uploadedAt}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 