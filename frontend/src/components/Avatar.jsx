import React, { useState, useRef } from "react";
import { Pencil } from "lucide-react";
import axios from "../config/axios";

const Avatar = ({ organization, onImageUpdate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setIsUploading(true);
      const res = await axios.patch(`/org/image/${organization.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (onImageUpdate) onImageUpdate(res.data.imageUrl);
      setShowModal(false);
      setSelectedFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  // Determine if avatar is editable
  const isEditable = typeof onImageUpdate === "function";

  return (
    <>
      {/* Avatar Box */}
      <div
        className={`relative flex items-center justify-center font-bold text-white overflow-hidden
          ${
            isEditable
              ? "w-32 h-32 rounded-md text-7xl"
              : "w-10 h-10 rounded-md text-lg"
          }
          bg-secondary
          cursor-${isEditable ? "pointer" : "default"}`}
        onMouseEnter={() => isEditable && setIsHovered(true)}
        onMouseLeave={() => isEditable && setIsHovered(false)}
      >
        {/* Display image or first char */}
        {organization.image ? (
          <img
            src={organization.image}
            alt={organization.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="flex items-center justify-center h-full w-full leading-none">
            {organization.name.charAt(0).toUpperCase()}
          </span>
        )}

        {/* Hover Overlay */}
        {isEditable && isHovered && (
          <div
            onClick={() => setShowModal(true)}
            className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all"
          >
            <Pencil className="w-8 h-8 text-white" />
          </div>
        )}
      </div>

      {/* Modal */}
      {isEditable && showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Update Organization Image
            </h2>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 mb-4"
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedFile(null);
                  setPreview(null);
                }}
                className="px-4 py-2 bg-gray-200 rounded-md text-gray-800 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className={`px-4 py-2 rounded-md text-white ${
                  isUploading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Avatar;
