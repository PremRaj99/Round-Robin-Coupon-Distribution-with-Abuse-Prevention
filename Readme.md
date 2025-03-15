# Round-Robin Coupon Distribution with Abuse Prevention

## Project Overview

This project is a **RESTful API** built with **Express.js and MongoDB** for managing coupon distribution in a **round-robin manner**, preventing abuse and ensuring fair allocation.

---

## Folder Structure

```
root/
│
├── src/
│   ├── controllers/       # Business logic for each route
│   ├── models/            # Mongoose schema models
│   ├── routes/            # Express API endpoints
│   ├── middleware/        # Middleware functions (Auth, Abuse Prevention)
│   ├── utils/             # Helper functions
│   ├── config/            # Database & env configuration
│   ├── index.js           # Entry point
│
├── .env                   # Environment variables
├── package.json           # Dependencies & scripts
└── README.md              # Documentation
```

---

## Environment Variables

Create a `.env` file with the following values:

```plaintext
PORT=5000
MONGO_URI=mongodb://localhost:27017/couponDB
JWT_SECRET=your_secret_key
ROUND_ROBIN_LIMIT=5 # Max number of times a user can receive a coupon
```

---

## API Endpoints

### **User Routes**

| Method | Endpoint             | Description                        |
| ------ | -------------------- | ---------------------------------- |
| `POST` | `/api/v1/auth/signup`   | Register a new user                |
| `POST` | `/api/v1/auth/login`    | Authenticate user and return token |
| `GET`  | `/api/v1/user/me` | Get user profile                   |
| `GET`  | `/api/v1/user/all` | Get all user list                   |
| `GET`  | `/api/v1/user/:id` | Get user by User Id                   |
| `PUT`  | `/api/v1/user/change-password`  | user change password                |
| `PUT`  | `/api/v1/user/update`  | Update user details                |

### **Coupon Routes**

| Method   | Endpoint                  | Description              |
| -------- | ------------------------- | ------------------------ |
| `POST`   | `/api/v1/coupon/create`     | Admin creates a coupon   |
| `GET`    | `/api/v1/coupon`            | Get all active coupons   |
| `GET`    | `/api/v1/coupon/:id`        | Get coupon details by ID |
| `POST`    | `/api/v1/coupon/validate`        | Validate coupon details by Code |
| `PUT`    | `/api/v1/coupon/:id` | Update coupon details    |
| `DELETE` | `/api/v1/coupon/:id` | Delete a coupon          |

### **Coupon Distribution Routes**

| Method | Endpoint                  | Description                               |
| ------ | ------------------------- | ----------------------------------------- |
| `POST` | `/api/v1/coupons/distribute` | Distribute coupons in round-robin fashion |
| `GET`  | `/api/v1/coupons/user/:id`   | Get coupons assigned to a user            |

### **Transaction Routes**

| Method | Endpoint                     | Description                             |
| ------ | ---------------------------- | --------------------------------------- |
| `POST` | `/api/v1/transactions/redeem`   | Redeem a coupon and process transaction |
| `GET`  | `/api/v1/transactions/user/:id` | Get transaction history of a user       |

### **Abuse Prevention Routes**

| Method | Endpoint                | Description                      |
| ------ | ----------------------- | -------------------------------- |
| `POST` | `/api/v1/abuse/report`     | Report coupon misuse             |
| `GET`  | `/api/v1/abuse/reports`    | Admin fetches all abuse reports  |
| `PUT`  | `/api/v1/abuse/review/:id` | Mark an abuse report as reviewed |

---

## Setup Instructions

### **1. Clone the Repository**

```bash
git clone https://github.com/yourrepo/round-robin-coupons.git
cd round-robin-coupons
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Start the Server**

```bash
npm start
```

---

## Middleware & Features

### **Authentication Middleware**

- Uses **JWT-based authentication** for securing routes.
- Admin routes are protected with role-based access control.

### **Round-Robin Coupon Distribution**

- Ensures **fair** allocation of coupons across users.
- Prevents one user from hoarding multiple coupons before others.

### **Abuse Prevention Mechanism**

- Tracks misuse attempts and **flags users**.
- Users exceeding `ROUND_ROBIN_LIMIT` are blocked from receiving new coupons.

---

## License

This project is licensed under the MIT License.
