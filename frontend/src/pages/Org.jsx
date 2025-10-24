import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrum";
import React, { useState, useEffect } from "react";
import { Edit2, Mail, Phone, Users, ChevronDown } from "lucide-react";
import axios from "../config/axios";
import EditOrg from "../components/EditOrg";
import UserTab from "../components/UserTab";
import Avatar from "../components/Avatar";
import StatusBadge from "../components/StatusBadge";
import { StatusConfig } from "../components/Organizations";

const OrganizationProfile = () => {
  const { id } = useParams();
  const breadcrumbItems = [
    { title: "Manage B2B organizations", link: "/" },
    { title: "Organization details", link: `/${id}` },
  ];
  const [activeTab, setActiveTab] = useState("basic");
  const [isEditing, setIsEditing] = useState(false);
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [formData, setFormData] = useState({
    adminName: "",
    supportEmail: "",
    alternativePhone: "",
    maxCoordinators: 5,
    timezone: "",
    region: "",
    language: "",
    websiteURL: "",
  });

  const [errors, setErrors] = useState([]);
  useEffect(() => {
    fetchOrganization();
  }, [id]);

  const fetchOrganization = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/org/${id}`);
      if (data?.organization) {
        setOrganization(data.organization);
        setFormData({
          adminName: data.organization.adminName || "",
          supportEmail: data.organization.supportEmail || "",
          alternativePhone: data.organization.alternativePhone || "",
          maxCoordinators: data.organization.maxCoordinators || 5,
          timezone: data.organization.timezone || "",
          region: data.organization.region || "",
          language: data.organization.language || "",
          websiteURL: data.organization.websiteURL || "",
        });
      }
    } catch (error) {
      console.error("Error fetching organization:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = [];

    // Validate adminName (if provided)
    if (formData.adminName && formData.adminName.trim().length < 2) {
      newErrors.push({
        field: "adminName",
        message: "Admin name must be at least 2 characters long",
      });
    }

    // Validate supportEmail (if provided)
    if (formData.supportEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.supportEmail)) {
        newErrors.push({
          field: "supportEmail",
          message: "Please enter a valid email address",
        });
      }
    }

    // Validate alternativePhone (if provided)
    if (formData.alternativePhone) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(formData.alternativePhone.replace(/[\s-]/g, ""))) {
        newErrors.push({
          field: "alternativePhone",
          message: "Please enter a valid 10-digit phone number",
        });
      }
    }

    // Validate maxCoordinators
    if (formData.maxCoordinators < 1) {
      newErrors.push({
        field: "maxCoordinators",
        message: "Maximum coordinators must be at least 1",
      });
    }

    // Validate websiteURL (if provided)
    if (formData.websiteURL) {
      try {
        new URL(formData.websiteURL);
        if (
          !formData.websiteURL.startsWith("http://") &&
          !formData.websiteURL.startsWith("https://")
        ) {
          newErrors.push({
            field: "websiteURL",
            message: "Website URL must start with http:// or https://",
          });
        }
      } catch {
        newErrors.push({
          field: "websiteURL",
          message: "Please enter a valid URL",
        });
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async () => {
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    try {
      // Filter out empty fields
      const updateData = Object.entries(formData).reduce(
        (acc, [key, value]) => {
          if (value !== "" && value !== null && value !== undefined) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      const { data } = await axios.patch(`/org/${id}`, updateData);
      if (data?.organization) {
        setOrganization(data.organization);
        setIsEditing(false);
        setErrors([]);
      }
    } catch (error) {
      console.error("Error updating organization:", error);
      // Handle API errors
      if (error.response?.data?.message) {
        setErrors([
          {
            field: "general",
            message: error.response.data.message,
          },
        ]);
      } else {
        setErrors([
          {
            field: "general",
            message: "Failed to update organization. Please try again.",
          },
        ]);
      }
    }
  };
  const getFieldError = (fieldName) => {
    const error = errors.find((err) => err.field === fieldName);
    return error?.message;
  };

  // Helper function to check if a field has an error
  const hasFieldError = (fieldName) => {
    return errors.some((err) => err.field === fieldName);
  };
  const handleCancel = () => {
    setFormData({
      adminName: organization.adminName || "",
      supportEmail: organization.supportEmail || "",
      alternativePhone: organization.alternativePhone || "",
      maxCoordinators: organization.maxCoordinators || 5,
      timezone: organization.timezone || "",
      region: organization.region || "",
      language: organization.language || "",
      websiteURL: organization.websiteURL || "",
    });
    setIsEditing(false);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const { data } = await axios.patch(`/org/status/${id}`, {
        status: newStatus,
      });
      setOrganization((prev) => ({
        ...prev,
        status: newStatus,
      }));
      setShowStatusDropdown(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Inactive":
        return "bg-yellow-100 text-yellow-700";
      case "Blocked":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">Organization not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start gap-4">
            <Avatar
              organization={organization}
              onImageUpdate={(url) =>
                setOrganization((prev) => ({ ...prev, image: url }))
              }
            />
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-gray-900">
                {organization.name}
              </h1>
              <p className="text-gray-600 mt-1">{organization.slug}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {organization.contact}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {organization.email}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 relative">
              <StatusBadge
                config={StatusConfig}
                title={organization.status}
                needPill={true}
              />
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1"
              >
                Change status
                <ChevronDown className="w-4 h-4" />
              </button>

              {showStatusDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[140px]">
                  <button
                    onClick={() => handleStatusChange("Active")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Active
                  </button>
                  <button
                    onClick={() => handleStatusChange("Inactive")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    Inactive
                  </button>
                  <button
                    onClick={() => handleStatusChange("Blocked")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Blocked
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className=" ">
          <div className="border-b mb-10 rounded-lg shadow-sm border  bg-white border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("basic")}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === "basic"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Basic details
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === "users"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Users
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 rounded-lg shadow-sm border border-gray-200 bg-white">
            {activeTab === "basic" && (
              <EditOrg
                handleCancel={handleCancel}
                handleInputChange={handleInputChange}
                formData={formData}
                isEditing={isEditing}
                organization={organization}
                setIsEditing={setIsEditing}
                handleSubmit={handleSubmit}
                hasFieldError={hasFieldError}
                errors={errors}
                getFieldError={getFieldError}
              />
            )}

            {activeTab === "users" && <UserTab ordId={id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationProfile;
