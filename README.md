# Job Portal API

## Overview

The **Job Portal API** is a backend application built using **Node.js**, **Express.js**, and **MongoDB**. It provides functionality for job seekers and employers to interact, including job postings, applications, authentication, and user management.

## Features

- ✅ **User Authentication**: Register and login using JWT authentication.
- ✅ **Role-Based Access Control**: Separate roles for job seekers and employers.
- ✅ **Company Management**: Employers can create, update, and delete job listings.
- ✅ **Job Management**: Employers can create, update, and delete job listings.
- ✅ **Applications Managment**: Job seekers can apply for jobs.
- ✅ **User Profiles**: Manage user details and preferences.
- ✅ **Pagination & Filtering**: Efficient retrieval of job listings with filters.
- ✅ **Secure API**: Data validation, error handling, and authentication.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt.js
- **Validation**: Express-Validator
- **Security**: Helmet, CORS, XSS-Clean, Rate Limiting

## Installation

### Prerequisites

- Install **Node.js** and **MongoDB**
- Install **Postman** (optional, for testing API endpoints)

### Setup

2. Install dependencies:
   ```sh
   npm install
   ```

## API Endpoints

### **Authentication**

- **POST** `/api/auth/register` → Register a new user
- **POST** `/api/auth/login` → Login user and return JWT token

### **Users**

- **PATCH** `/api/users/profile` → Update user profile

### **Company**

- **GET** `/api/company` → Get all companies listings (with filtering & pagination)
- **POST** `/api/company` → Create a new job (Employer only)
- **GET** `/api/company/me` → Get my own company
- **GET** `/api/company/:id` → Get details company
- **PATCH** `/api/company/:id` → Update company details (Employer only)
- **DELETE** `/api/company/:id` → Delete a company (Employer only)

### **Jobs**

- **GET** `/api/jobs` → Get all job for company
- **POST** `/api/jobs` → Create a new job (Employer only)
- **GET** `/api/jobs/:id` → Get job details by ID
- **PATCH** `/api/jobs/:id` → Update job details (Employer only)
- **DELETE** `/api/jobs/:id` → Delete a job (Employer only)

### **Job Applications**

- **POST** `/api/app/:jobId` → Apply for a job (Job Seeker only)
- **GET** `/api/app` → Get job applications (Employer only)
- **PATCH** `/api/jobs/:id` → Update job status (Employer only)


## Database Models


## Security & Best Practices

- ✅ **JWT Authentication** for securing routes.
- ✅ **Password Hashing** using `bcrypt.js`.
- ✅ **Error Handling** for API responses.
- ✅ **CORS & Security Headers** using `helmet` & `cors`.


