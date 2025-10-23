import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";

import { Pencil, Trash, ChevronDown, Check } from "lucide-react";
import axios from "../config/axios";
const UserTab = ({ ordId }) => {
  const [addingUser, setAddingUser] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [addingUserErros, setAddingUserErrors] = useState({
    userName: "",
    selectedRole: "",
  });
  const [users, setUsers] = useState([]);
  const roles = ["admin", "coordinator"];

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/users/org/" + ordId);
        if (data) {
          setUsers(data.users);
        }
      } catch (error) {
        console.log("error geting users data", error);
      }
    })();
  }, []);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIsDropdownOpen(false);
  };

  const validateUser = (userName, selectedRole) => {
    const newErrors = { userName: "", selectedRole: "" };
    let isValid = true;

    if (!userName || userName.trim() === "") {
      newErrors.userName = "User name is required.";
      isValid = false;
    }

    const validRoles = ["admin", "coordinator"];
    if (!selectedRole || !validRoles.includes(selectedRole)) {
      newErrors.selectedRole =
        "Please select a valid role (Admin or Co-ordinator).";
      isValid = false;
    }

    setAddingUserErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    console.log(userName, selectedRole);

    if (validateUser(userName, selectedRole)) {
      console.log("Validation passed. Submitting:", userName, selectedRole);

      try {
        const response = await axios.post("/users", {
          name: userName,
          role: selectedRole,
          organizationId: ordId,
        });

        console.log("User added successfully:", response.data);

        setUsers((prev) => [...prev, response.data.user]);
        setAddingUser(false);
      } catch (error) {
        console.error("Error submitting form:", error);

        setAddingUserErrors((prevErrors) => ({
          ...prevErrors,
          form: "An error occurred. Please try again.",
        }));
      } finally {
        // setIsLoading(false);
      }
    } else {
      console.log("Validation failed. Please check the errors.");
    }
  };

  const deleteUser = async (user) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete user ${user.name}?`
    );
    if (!confirmDelete) return;

    try {
      const { data } = await axios.delete("/users/" + user.id);
      setUsers((prev) => prev.filter((us) => us.id != user.id));
    } catch (error) {
      console.log("error deleting users ", error);
    }
  };

  const handleRoleChangeOnEdit = (userId, newRole) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const updateUserRole = async (user) => {
    try {
      const { data } = await axios.patch("/users/" + user.id, {
        role: user.role,
      });
    } catch (error) {
      console.log("error deleting users ", error);
    }
  };
  return (
    <div>
      <div className="">
        {/* Header */}
        <div className="flex w-full items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
          <button
            onClick={() => setAddingUser(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center gap-2"
          >
            {/* It's good practice to include an icon in the button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add user
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left ">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 w-[70px]">
                  Sr. No
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500">
                  User name
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 w-[300px]">
                  Role
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 w-[100px]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 border-b w-full border-gray-200 last:border-b-0"
                >
                  <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {user.name}
                  </td>
                  <td className="px-4 py-3">
                    {isEditing === user.id ? (
                      // In EDIT mode, show a dropdown
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChangeOnEdit(user.id, e.target.value)
                        }
                        // This default styling looks good.
                        // For best results: npm install -D @tailwindcss/forms
                        // and add require('@tailwindcss/forms') to your tailwind.config.js plugins
                        className="block w-full py-1.5 px-2 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      >
                        <option value="select">select role</option>
                        <option value="admin">Admin</option>
                        <option value="coordinator">Co-ordinator</option>
                        {/* Add any other roles you have */}
                      </select>
                    ) : (
                      // In VIEW mode, show the span
                      <span
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          user.role.toLowerCase() === "admin"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    )}
                  </td>

                  {/* --- Action Cell --- */}
                  <td className="px-4 py-3 flex gap-3">
                    {isEditing ? (
                      // In EDIT mode, show a 'Save' button
                      <button
                        onClick={() => {
                          setIsEditing(null);
                          updateUserRole(user);
                        }}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Check size={18} />
                      </button>
                    ) : (
                      // In VIEW mode, show the 'Edit' button
                      <button
                        onClick={() => setIsEditing(user.id)} // Click to enter edit mode
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Pencil size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteUser(user)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <h3 className="w-full text-2xl my-6 text-center">
              No users on this organization
            </h3>
          )}
        </div>
      </div>

      <ModalWrapper
        isOpen={addingUser}
        onClose={() => setAddingUser(false)} // You might want to clear errors here too
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
              className={`
          w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-1 placeholder:text-gray-400
       
         ${
           addingUserErros.userName
             ? "border-red-500 focus:border-red-500 focus:ring-red-500"
             : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
         }
        `}
            />
            {/* --- ADDED ERROR MESSAGE --- */}
            {addingUserErros.userName && (
              <p className="text-red-500 text-xs mt-1.5">
                {addingUserErros.userName}
              </p>
            )}
          </div>

          {/* Role Dropdown */}
          <div className="relative">
            <label className="block text-sm text-gray-700 mb-2">
              Choose user role
            </label>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`
          w-full px-4 py-2.5 border rounded-lg bg-white text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-1
          ${
            addingUserErros.selectedRole
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          }
        `}
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

            {/* --- ADDED ERROR MESSAGE --- */}
            {addingUserErros.selectedRole && (
              <p className="text-red-500 text-xs mt-1.5">
                {addingUserErros.selectedRole}
              </p>
            )}
          </div>

          {/* --- ADDED: Optional general form error --- */}
          {addingUserErros.form && (
            <p className="text-red-500 text-sm mt-4 text-center">
              {addingUserErros.form}
            </p>
          )}
        </div>
      </ModalWrapper>
    </div>
  );
};

export default UserTab;
