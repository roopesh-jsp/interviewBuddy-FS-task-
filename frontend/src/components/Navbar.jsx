import { Headphones, Bell, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="">
        <div className="sticky top-0 flex items-center justify-between w-full px-8 py-4 bg-white shadow-[0_4px_8px_rgba(54,93,226,0.08)] backdrop-blur-2xl">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div className="border-2 border-black px-3 py-1">
              <span className="font-bold text-sm">LOGO</span>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Headphones className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Bell className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 bg-purple-100 hover:bg-purple-200 rounded-full transition">
              <User className="w-5 h-5 text-purple-600" />
            </button>
          </div>
        </div>
        {/* Navigation tabs */}
        <div className="flex items-center space-x-8 mt-6 w-full px-[70px] py-2` bg-white shadow-[0_4px_8px_rgba(54,93,226,0.08)] backdrop-blur-2xl">
          <button className="text-gray-600 text-[14px] hover:text-gray-900 pb-3 transition">
            Dashboard
          </button>
          <button className="text-purple-600 text-[14px] border-b-2 border-purple-600 pb-3 font-medium">
            Manage B2B organizations
          </button>
        </div>
      </div>
    </nav>
  );
}
