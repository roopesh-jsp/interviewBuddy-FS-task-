import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrum";

const Org = () => {
  const { id } = useParams();
  const breadcrumbItems = [
    { title: "Manage B2B organizations", link: "/" },
    { title: "Organization details", link: `/${id}` }, // current page
  ];
  return (
    <div>
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
};

export default Org;
