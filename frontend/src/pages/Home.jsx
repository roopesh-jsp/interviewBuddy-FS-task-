import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrum";
import ModalWrapper from "../components/ModalWrapper";
import B2BOrganizationsTable from "../components/Organizations";

const breadcrumbItems = [
  { title: "Manage B2B organizations", link: "/" }, // current page
];
const organizations = [
  {
    id: 1,
    name: "Organization name",
    logo: "🅿️",
    logoColor: "bg-purple-500",
    pendingRequests: 45,
    status: "Active",
    statusColor: "bg-green-500",
  },
  {
    id: 2,
    name: "Organization name",
    logo: "🏢",
    logoColor: "bg-red-500",
    pendingRequests: 45,
    status: "Blocked",
    statusColor: "bg-red-500",
    tooltip: "Vepada Yagnesh",
  },
  {
    id: 3,
    name: "Organization name",
    logo: "🏪",
    logoColor: "bg-blue-500",
    pendingRequests: 45,
    status: "Inactive",
    statusColor: "bg-gray-400",
  },
];
const Home = () => {
  const [addingOrg, setAddingOrg] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    slug: "",
    organizationMail: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="max-w-[1450px] px-10 mx-auto">
        <Breadcrumb items={breadcrumbItems} />

        <B2BOrganizationsTable
          addOrd={() => setAddingOrg(true)}
          organizations={organizations}
        />
      </div>
      <ModalWrapper
        isOpen={addingOrg}
        onClose={() => setAddingOrg(false)}
        title={"Add Organization"}
        onSubmit={handleSubmit}
      >
        <form className="w-full max-w-2xl mx-auto p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Name of the organization */}
            <div>
              <label
                htmlFor="organizationName"
                className="block text-sm text-gray-600 mb-2"
              >
                Name of the organization
              </label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                placeholder="Text"
                value={formData.organizationName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Slug */}
            <div>
              <label
                htmlFor="slug"
                className="block text-sm text-gray-600 mb-2"
              >
                Slug
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                placeholder="Type here"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Organization mail */}
            <div>
              <label
                htmlFor="organizationMail"
                className="block text-sm text-gray-600 mb-2"
              >
                Organization mail
              </label>
              <input
                type="email"
                id="organizationMail"
                name="organizationMail"
                placeholder="Type here"
                value={formData.organizationMail}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Contact */}
            <div>
              <label
                htmlFor="contact"
                className="block text-sm text-gray-600 mb-2"
              >
                Contact
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                placeholder="Type here"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </div>
  );
};

export default Home;
