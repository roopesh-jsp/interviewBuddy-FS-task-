import { Edit2, Mail, Phone, Users, ChevronDown } from "lucide-react";

const EditOrg = ({
  isEditing,
  handleCancel,
  handleSubmit,
  organization,
  handleInputChange,
  formData,
  setIsEditing,
  hasFieldError,
  errors,
  getFieldError,
}) => {
  return (
    <div>
      <div>
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* General error message */}
        {errors.find((err) => err.field === "general") && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">
              {errors.find((err) => err.field === "general").message}
            </p>
          </div>
        )}

        {/* Organization Details Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Organization details
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Organization Name
              </label>
              <input
                type="text"
                value={organization.name}
                disabled
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Organization SLUG
              </label>
              <input
                type="text"
                value={organization.slug}
                disabled
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Contact details
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Primary Admin name
              </label>
              <input
                type="text"
                name="adminName"
                value={formData.adminName}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={isEditing ? "Taylor Jones" : ""}
                className={`w-full px-3 py-2 border rounded-lg ${
                  hasFieldError("adminName")
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : isEditing
                    ? "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                } ${
                  !isEditing && "cursor-not-allowed"
                } outline-none placeholder:text-gray-400 placeholder:font-normal`}
              />
              {hasFieldError("adminName") && (
                <p className="text-red-500 text-xs mt-1">
                  {getFieldError("adminName")}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Primary Admin Mail id
              </label>
              <input
                type="email"
                name="supportEmail"
                value={formData.supportEmail}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={isEditing ? "admin@organization.com" : ""}
                className={`w-full px-3 py-2 border rounded-lg ${
                  hasFieldError("supportEmail")
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : isEditing
                    ? "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                } ${
                  !isEditing && "cursor-not-allowed"
                } outline-none placeholder:text-gray-400 placeholder:font-normal`}
              />
              {hasFieldError("supportEmail") && (
                <p className="text-red-500 text-xs mt-1">
                  {getFieldError("supportEmail")}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Support Email ID
              </label>
              <input
                type="email"
                value={organization.email}
                disabled
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Phone no
              </label>
              <div className="flex gap-2">
                <select
                  className="w-20 px-2 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                  disabled
                >
                  <option>+91</option>
                </select>
                <input
                  type="text"
                  value={organization.contact}
                  disabled
                  className="flex-1 px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Alternative phone no
              </label>
              <div className="flex gap-2">
                <select
                  className={`w-20 px-2 py-2 border rounded-lg ${
                    isEditing
                      ? "border-gray-300"
                      : "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!isEditing}
                >
                  <option>+91</option>
                </select>
                <div className="flex-1">
                  <input
                    type="text"
                    name="alternativePhone"
                    value={formData.alternativePhone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder={isEditing ? "9347294813" : ""}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      hasFieldError("alternativePhone")
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : isEditing
                        ? "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        : "bg-gray-50 border-gray-200 text-gray-600"
                    } ${
                      !isEditing && "cursor-not-allowed"
                    } outline-none placeholder:text-gray-400 placeholder:font-normal`}
                  />
                </div>
              </div>
              {hasFieldError("alternativePhone") && (
                <p className="text-red-500 text-xs mt-1">
                  {getFieldError("alternativePhone")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Maximum Allowed Coordinators */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Maximum Allowed Coordinators
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                No. of Max Coordinators
              </label>
              <select
                name="maxCoordinators"
                value={formData.maxCoordinators}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg ${
                  hasFieldError("maxCoordinators")
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : isEditing
                    ? "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                } ${!isEditing && "cursor-not-allowed"} outline-none`}
              >
                <option value={3}>Up to 3 Coordinators</option>
                <option value={5}>Up to 5 Coordinators</option>
                <option value={10}>Up to 10 Coordinators</option>
                <option value={999}>Unlimited</option>
              </select>
              {hasFieldError("maxCoordinators") && (
                <p className="text-red-500 text-xs mt-1">
                  {getFieldError("maxCoordinators")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Timezone */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Timezone</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Common name
              </label>
              <select
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg ${
                  hasFieldError("timezone")
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : isEditing
                    ? "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                } ${!isEditing && "cursor-not-allowed"} outline-none`}
              >
                <option value="">Select timezone</option>
                <option value="India Standard Time">India Standard Time</option>
                <option value="Eastern Standard Time">
                  Eastern Standard Time
                </option>
                <option value="Central European Time">
                  Central European Time
                </option>
                <option value="Pacific Standard Time">
                  Pacific Standard Time
                </option>
              </select>
              {hasFieldError("timezone") && (
                <p className="text-red-500 text-xs mt-1">
                  {getFieldError("timezone")}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Region</label>
              <select
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg ${
                  hasFieldError("region")
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : isEditing
                    ? "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                } ${!isEditing && "cursor-not-allowed"} outline-none`}
              >
                <option value="">Select region</option>
                <option value="Asia/Colombo">Asia/Colombo</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Asia/Kolkata">Asia/Kolkata</option>
                <option value="America/Los_Angeles">America/Los_Angeles</option>
              </select>
              {hasFieldError("region") && (
                <p className="text-red-500 text-xs mt-1">
                  {getFieldError("region")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Language</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Choose the language for organization
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg ${
                  hasFieldError("language")
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : isEditing
                    ? "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                } ${!isEditing && "cursor-not-allowed"} outline-none`}
              >
                <option value="">Select language</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Hindi">Hindi</option>
              </select>
              {hasFieldError("language") && (
                <p className="text-red-500 text-xs mt-1">
                  {getFieldError("language")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Official Website URL */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Official website URL
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                website URL
              </label>
              <input
                type="url"
                name="websiteURL"
                value={formData.websiteURL}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={isEditing ? "https://organization.com" : ""}
                className={`w-full px-3 py-2 border rounded-lg ${
                  hasFieldError("websiteURL")
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : isEditing
                    ? "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                } ${
                  !isEditing && "cursor-not-allowed"
                } outline-none placeholder:text-gray-400 placeholder:font-normal`}
              />
              {hasFieldError("websiteURL") && (
                <p className="text-red-500 text-xs mt-1">
                  {getFieldError("websiteURL")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrg;
