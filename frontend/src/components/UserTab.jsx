import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { ChevronDown } from "lucide-react";

const UserTab = () => {
  const [addingUser, setAddingUser] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const roles = ["Admin", "Co-ordinator"];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async () => {
    console.log(userName, selectedRole);
  };

  return (
    <div>
      <div className="flex w-full items-center justify-between px-5 py-10">
        <h1>Users</h1>
        <button onClick={() => setAddingUser(true)}>add users</button>
      </div>
      <ModalWrapper
        isOpen={addingUser}
        onClose={() => setAddingUser(false)}
        title="add users"
        onSubmit={handleSubmit}
      >
        <div className="max-w-md p-6 bg-white">
          {/* Name Input */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">
              Name of the user
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Type here"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
            />
          </div>

          {/* Role Dropdown */}
          <div className="relative">
            <label className="block text-sm text-gray-700 mb-2">
              Choose user role
            </label>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <span
                className={selectedRole ? "text-gray-900" : "text-gray-400"}
              >
                {selectedRole || "Select an option"}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  isDropdownOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default UserTab;
