# College Management API

<img width="1433" height="1080" alt="Screenshot 2026-07-08 150410" src="https://github.com/user-attachments/assets/40fd3c05-157c-4ca4-9dde-d3de70d82ae3" />


A robust RESTful API built with **Node.js**, **Express**, and **Mongoose** for managing a college database system. This project includes secure user authentication using **JWT (JSON Web Tokens)** and full **CRUD (Create, Read, Update, Delete)** operations for managing student records.

---

## 🚀 Features

* **User Authentication**: Secure user registration and login endpoints utilizing `bcryptjs` for password hashing and `jsonwebtoken` for stateless authentication.
* **Student Management**: Complete CRUD operations for handling student profiles.
* **Database Integration**: Structured data management using MongoDB and Mongoose schemas (User, Course, Teacher, Student).
* **Environment Configuration**: Protected environment variables handled via `dotenv`.

---

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB, Mongoose ODM
* **Security**: bcryptjs, JSON Web Tokens (JWT)
* **Configuration**: dotenv

---

## 📋 Prerequisites

Before running this project, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v14+ recommended)
* [MongoDB](https://www.mongodb.com/) (Running locally on `mongodb://127.0.0.1:27017`)

---

## ⚙️ Getting Started

### 1. Clone the Repository

git clone <repository-url>
cd <project-directory>

Install Dependencies 
npm install

Put environment variable by creating .env file

> JWT_SECRET=your_super_secret_jwt_key_here
### Owner - 
 Wasim K
