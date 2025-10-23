import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrum";
import ModalWrapper from "../components/ModalWrapper";
import B2BOrganizationsTable from "../components/Organizations";
import axios from "../config/axios";

const breadcrumbItems = [{ title: "Manage B2B organizations", link: "/" }];

const Home = () => {
  const [addingOrg, setAddingOrg] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    email: "",
    contact: "",
  });

  // Fetch organizations
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get("/org");
        if (data) setOrganizations(data.organizations);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch organizations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrganizations();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
  };

  // Validate all fields
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/;

    if (!formData.name.trim()) {
      errors.name = "Organization name is required.";
    }
    if (!formData.slug.trim()) {
      errors.slug = "Slug is required.";
    }
    if (!formData.email.trim()) {
      errors.email = "Organization mail is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format.";
    }
    if (!formData.contact.trim()) {
      errors.contact = "Contact number is required.";
    } else if (!phoneRegex.test(formData.contact)) {
      errors.contact = "Enter a valid phone number (7–15 digits).";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      setError(null);

      const { data } = await axios.post("/org", formData);

      // Add new organization to the list  (optimistic update)
      setOrganizations((prev) => {
        return [...prev, data.organization];
      });

      // Reset form and close modal
      setFormData({
        name: "",
        slug: "",
        email: "",
        contact: "",
      });
      setAddingOrg(false);
    } catch (err) {
      console.error(err);
      setError("Failed to add organization. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="max-w-[1450px] px-10 mx-auto">
        <Breadcrumb items={breadcrumbItems} />

        {loading ? (
          <div className="text-center text-gray-600 py-10">
            Loading organizations...
          </div>
        ) : error && !addingOrg ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <B2BOrganizationsTable
            addOrd={() => setAddingOrg(true)}
            organizations={organizations}
            setOrganizations={setOrganizations}
          />
        )}
      </div>

      <ModalWrapper
        isOpen={addingOrg}
        onClose={() => setAddingOrg(false)}
        title={"Add Organization"}
        onSubmit={handleSubmit}
        loading={submitting}
      >
        <form
          className="w-full max-w-2xl mx-auto p-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Name of the organization */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-gray-600 mb-2"
              >
                Name of the organization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter organization name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formErrors.name ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm`}
              />
              {formErrors.name && (
                <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label
                htmlFor="slug"
                className="block text-sm text-gray-600 mb-2"
              >
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                placeholder="Enter slug"
                value={formData.slug}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formErrors.slug ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm`}
              />
              {formErrors.slug && (
                <p className="text-red-500 text-xs mt-1">{formErrors.slug}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Organization mail */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-600 mb-2"
              >
                Organization mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm`}
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
              )}
            </div>

            {/* Contact */}
            <div>
              <label
                htmlFor="contact"
                className="block text-sm text-gray-600 mb-2"
              >
                Contact <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                placeholder="Enter contact number"
                value={formData.contact}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formErrors.contact ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm`}
              />
              {formErrors.contact && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.contact}
                </p>
              )}
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}
          {submitting && (
            <p className="text-gray-500 text-sm mt-2 text-center">
              Adding organization...
            </p>
          )}
        </form>
      </ModalWrapper>
    </div>
  );
};

export default Home;
