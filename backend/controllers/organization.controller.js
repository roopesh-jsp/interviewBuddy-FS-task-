import Organization from "../models/organization.model.js";
export const createOrganization = async (req, res) => {
  try {
    const { name, slug, contact, email } = req.body;
    console.log(name, slug, contact, email);

    // Basic validation
    if (!name || !slug || !contact || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create the org
    const org = await Organization.create({
      name,
      slug,
      contact,
      email,
    });

    res.status(201).json({
      message: "Organization created successfully",
      organization: org,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllOrganizations = async (req, res) => {
  try {
    const orgs = await Organization.findAll(); // Fetch all orgs
    res.status(200).json({
      message: "Organizations fetched successfully",
      organizations: orgs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;

    const org = await Organization.findByPk(id);
    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json({
      message: "Organization fetched successfully",
      organization: org,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // Expect all fields in req.body

    const org = await Organization.findByPk(id);
    if (!org)
      return res.status(404).json({ message: "Organization not found" });

    // List of allowed fields to update
    const allowedFields = [
      //   "name",
      //   "slug",
      "adminName",
      //   "email",
      "supportEmail",
      //   "contact",
      "alternativePhone",
      "maxCoordinators",
      "timezone",
      "region",
      "language",
      "websiteURL",
    ];

    // Update only allowed fields
    allowedFields.forEach((field) => {
      if (updates[field] !== undefined) {
        org[field] = updates[field];
      }
    });

    await org.save();

    res.status(200).json({
      message: "Organization updated successfully",
      organization: org,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const org = await Organization.findByPk(id);
    if (!org)
      return res.status(404).json({ message: "Organization not found" });

    await org.destroy();
    res.status(200).json({ message: "Organization deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
