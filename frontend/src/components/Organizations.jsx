import { Plus, Eye, Trash2, Filter } from "lucide-react";
import { useState } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

export default function B2BOrganizationsTable({
  addOrd,
  organizations,
  setOrganizations,
}) {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const navigate = useNavigate();

  const handleView = (org) => {
    navigate(`/${org.id}`);
  };

  const handleDelete = async (org) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${org.name}?`
    );
    if (!confirmDelete) return;

    try {
      setDeleting(org.id);
      await axios.delete(`/org/${org.id}`);

      // Remove deleted org from list
      setOrganizations((prev) => prev.filter((item) => item.id !== org.id));
    } catch (error) {
      console.error("Error deleting organization:", error);
      alert("Failed to delete organization. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          B2B organizations
        </h2>
        <button
          onClick={addOrd}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add organization
        </button>
      </div>

      {/* Table using CSS Grid */}
      <div className="w-full">
        {/* Header Row */}
        <div className="grid grid-cols-[80px_1fr_1fr_150px_120px] gap-4 border-b border-gray-200 pb-3 mb-2">
          <div className="text-sm font-medium text-gray-600">Sr. No</div>
          <div className="text-sm font-medium text-gray-600">Organizations</div>
          <div className="text-sm font-medium text-gray-600">
            Pending requests
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            Status
            <Filter className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-sm font-medium text-gray-600">Action</div>
        </div>

        {/* Data Rows */}
        {organizations.map((org) => (
          <div
            key={org.id}
            className="grid grid-cols-[80px_1fr_1fr_150px_120px] gap-4 items-center py-4 border-b border-gray-100 hover:bg-gray-50 transition relative"
            onMouseEnter={() => setHoveredRow(org.id)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {/* Sr. No */}
            <div className="text-sm text-gray-900">{org.id}</div>

            {/* Organization */}
            <div className="flex items-center gap-3 relative">
              <div
                className={`w-10 h-10 ${org.logoColor} rounded flex items-center justify-center text-white text-xl flex-shrink-0`}
              >
                {org.logo}
              </div>
              <span className="text-sm text-gray-900">{org.name}</span>

              {/* Tooltip */}
              {org.tooltip && hoveredRow === org.id && (
                <div className="absolute left-16 top-12 bg-purple-600 text-white px-3 py-1.5 rounded text-sm whitespace-nowrap z-10 shadow-lg">
                  {org.tooltip}
                  <div className="absolute -top-1 left-4 w-2 h-2 bg-purple-600 transform rotate-45"></div>
                </div>
              )}
            </div>

            {/* Pending Requests */}
            <div className="text-sm text-gray-900">
              {org.pendingRequests} pending requests
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 text-sm">
              <span
                className={`w-2 h-2 rounded-full ${org.statusColor}`}
              ></span>
              <span
                className={
                  org.status === "Active"
                    ? "text-green-600"
                    : org.status === "Blocked"
                    ? "text-red-600"
                    : "text-gray-600"
                }
              >
                {org.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleView(org)}
                className="p-1.5 hover:bg-gray-200 rounded transition"
                title="View"
              >
                <Eye className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => handleDelete(org)}
                disabled={deleting === org.id}
                className="p-1.5 hover:bg-gray-200 rounded transition"
                title="Delete"
              >
                {deleting === org.id ? (
                  <span className="text-sm text-gray-500">...</span>
                ) : (
                  <Trash2 className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        ))}

        {organizations.length === 0 && (
          <div className="text-center py-6 text-gray-500 text-sm">
            No organizations found.
          </div>
        )}
      </div>
    </div>
  );
}
