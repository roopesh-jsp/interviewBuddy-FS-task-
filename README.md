# interviewBuddy-FS-task

### This is not a project its just a full stack task, done as a part of recruiting process

<br>
<br>
<br>

# Organization API Documentation

This document provides documentation for a simple REST API used to manage organizations and their associated users.

The API is built using **Node.js**, **Express**, **Sequelize** (as the ORM), and **SQLite** (as the database).

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **ORM:** Sequelize

---

## Database Models

The database consists of two models: `Organization` and `User`.

### Organization Model

Stores all information related to an organization.

| Field              | Type    | Constraints                       | Default               |
| :----------------- | :------ | :-------------------------------- | :-------------------- |
| `id`               | INTEGER | Primary Key, Auto-increment       |                       |
| `name`             | STRING  | Not Null                          |                       |
| `slug`             | STRING  | Not Null, Unique                  |                       |
| `adminName`        | STRING  | Allow Null                        |                       |
| `email`            | STRING  | Not Null, IsEmail                 |                       |
| `supportEmail`     | STRING  | Allow Null, IsEmail               |                       |
| `contact`          | STRING  | Not Null                          |                       |
| `alternativePhone` | STRING  | Allow Null                        |                       |
| `maxCoordinators`  | INTEGER |                                   | `5`                   |
| `timezone`         | STRING  |                                   | `India Standard Time` |
| `region`           | STRING  |                                   | `Asia/Colombo`        |
| `language`         | STRING  |                                   | `English`             |
| `websiteURL`       | STRING  | Allow Null, IsUrl                 |                       |
| `status`           | ENUM    | ('Active', 'Inactive', 'Blocked') | `Active`              |

### User Model

Stores users, who must belong to an organization.

| Field            | Type    | Constraints                              | Default       |
| :--------------- | :------ | :--------------------------------------- | :------------ |
| `id`             | INTEGER | Primary Key, Auto-increment              |               |
| `name`           | STRING  | Not Null                                 |               |
| `role`           | ENUM    | ('admin', 'coordinator')                 | `coordinator` |
| `organizationId` | INTEGER | Not Null, Foreign Key (Organizations.id) |               |

**Relationship:** An `Organization` has many `Users`. If an `Organization` is deleted, all associated `Users` are also deleted (`onDelete: "CASCADE"`).

---

## Authentication

**No authentication is required** for any endpoint. All routes are public.

---

## API Endpoints

All endpoints are relative to the base URL (e.g., `http://localhost:5000`). The router is mounted on `/org`.

### 1. Get All Organizations

- **Endpoint:** `GET /org`
- **Description:** Retrieves a list of all organizations in the database.
- **Success Response (200 OK):**

  ```json
  [
    {
  "message": "Organization fetched successfully",
  "organization": {
    "id": 1,
    "name": "org 1",
    "slug": "org test 1",
    "adminName": null,
    "email": "org1@mail.com",
    "supportEmail": "org1support@mail.com",
    "contact": "999999999",
    "alternativePhone": null,
    "maxCoordinators": 5,
    "timezone": "India Standard Time",
    "region": "Asia/Colombo",
    "language": "English",
    "websiteURL": null,
    "status": "Active",
    "createdAt": "2025-10-22T11:54:11.943Z",
    "updatedAt": "2025-10-22T12:02:15.206Z"
  },{
    "message": "Organization fetched successfully",
    "organization": {
    "id": 1,
    "name": "org 2",
    "slug": "org test 2",
    "adminName": null,
    "email": "org2@mail.com",
    "supportEmail": "org2support@mail.com",
    "contact": "888888888",
    "alternativePhone": null,
    "maxCoordinators": 5,
    "timezone": "India Standard Time",
    "region": "Asia/Colombo",
    "language": "English",
    "websiteURL": null,
    "status": "Active",
    "createdAt": "2025-10-22T11:54:11.943Z",
    "updatedAt": "2025-10-22T12:02:15.206Z"
    }
  ]
  ```

### 2. Get Organization by ID

- **Endpoint:** `GET /org/:id`
- **Description:** Retrieves a single organization by its unique ID.
- **Success Response (200 OK):**

  ```json
  {
    "message": "Organization fetched successfully",
    "organization": {
      "id": 1,
      "name": "org 1",
      "slug": "org test 1",
      "adminName": null,
      "email": "org1@mail.com",
      "supportEmail": "org1support@mail.com",
      "contact": "999999999",
      "alternativePhone": null,
      "maxCoordinators": 5,
      "timezone": "India Standard Time",
      "region": "Asia/Colombo",
      "language": "English",
      "websiteURL": null,
      "status": "Active",
      "createdAt": "2025-10-22T11:54:11.943Z",
      "updatedAt": "2025-10-22T12:02:15.206Z"
    }
  }
  ```

- **Error Response (404 Not Found):**
  ```json
  {
    "message": "Organization not found"
  }
  ```

### 3. Create Organization

- **Endpoint:** `POST /org`
- **Description:** Creates a new organization.
- **Request Body (JSON):**
  - Only `name`, `slug`, `contact`, and `email` are accepted.
  ```json
  {
    "name": "New Tech LLC",
    "slug": "new-tech",
    "contact": "5551234567",
    "email": "info@newtech.com"
  }
  ```
- **Success Response (201 Created):**
  - Returns the newly created organization object with default values.
  ```json
  {
    "message": "Organization created successfully",
    "organization": {
      "maxCoordinators": 5,
      "timezone": "India Standard Time",
      "region": "Asia/Colombo",
      "language": "English",
      "status": "Active",
      "id": 2,
      "name": "org 1 chang",
      "slug": "org test 2",
      "contact": "999999999",
      "email": "org1@mail.com",
      "updatedAt": "2025-10-22T12:15:08.718Z",
      "createdAt": "2025-10-22T12:15:08.718Z"
    }
  }
  ```

### 4. Update Organization

- **Endpoint:** `PATCH /org/:id`
- **Description:** Updates specific details of an existing organization.
- **Request Body (JSON):**
  - Only the following fields are allowed for patching:
    - `adminName`
    - `supportEmail`
    - `alternativePhone`
    - `maxCoordinators`
    - `timezone`
    - `region`
    - `language`
    - `websiteURL`
  ```json
  {
    "adminName": "John Doe",
    "supportEmail": "support@newtech.com",
    "websiteURL": "[https://newtech.com](https://newtech.com)",
    "maxCoordinators": 10
  }
  ```
- **Success Response (200 OK):**
  - Returns the completely updated organization object.
  ```json
  {
    "message": "Organization updated successfully",
    "organization": {
      "id": 3,
      "name": "New Tech LLC",
      "slug": "new-tech",
      "adminName": "John Doe",
      "email": "info@newtech.com",
      "supportEmail": "support@newtech.com",
      "contact": "5551234567",
      "alternativePhone": null,
      "maxCoordinators": 10,
      "timezone": "India Standard Time",
      "region": "Asia/Colombo",
      "language": "English",
      "websiteURL": "https://newtech.com",
      "status": "Active",
      "createdAt": "2025-10-22T12:10:00.000Z",
      "updatedAt": "2025-10-22T12:15:00.000Z"
    }
  }
  ```

### 5. Delete Organization

- **Endpoint:** `DELETE /org/:id`
- **Description:** Deletes an organization by its ID.
- **Note:** This action will also delete all associated users from the `Users` table.
- **Success Response (200 OK):**
  ```json
  {
    "message": "Organization deleted successfully"
  }
  ```
- **Error Response (404 Not Found):**
  ```json
  {
    "message": "Organization not found"
  }
  ```
