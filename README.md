# EduTech Server

The backend of the **EduTech platform**, built with **Express.js, TypeScript, and MongoDB**.  
It provides RESTful APIs for **student enrollment, course management, and book ordering**.

---

## ✨ Features

- 👨‍🎓 User authentication (JWT-based)  
- 📚 Course enrollment & management  
- 📖 Book ordering APIs  
- 🛡️ Input validation with Zod  
- 🔐 Secure password hashing with Bcrypt  
- 🍪 Cookie-based authentication support  
- ⚡ Express.js with TypeScript for scalability  
- 📂 MongoDB + Mongoose for database  

---

## 🛠️ Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Language:** TypeScript  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT, Bcrypt, Cookies  
- **Validation:** Zod  
- **Environment Config:** Dotenv  
- **Utilities:** Cors, Http-status-codes  

---

## 📂 Project Structure

```bash
edutech-server/
├── src/
│   ├── modules/        # Features (auth, courses, books, etc.)
│   ├── middlewares/    # Auth & error middlewares
│   ├── utils/          # Helpers (jwt, bcrypt, etc.)
│   ├── config/         # DB & app configuration
│   ├── server.ts       # Entry point (development)
│   └── app.ts          # Express app setup
├── dist/               # Compiled JavaScript (production)
├── package.json
└── tsconfig.json


🚀 Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/edutech-server.git
cd edutech-server

2. Install dependencies
npm install

3. Environment variables

Create a .env file in the root directory:

# Application
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=mongodb://127.0.0.1:27017/edutech

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Cookies
COOKIE_SECRET=your_cookie_secret

4. Run in development
npm run dev

5. Build for production
npm run build

6. Start production server
npm start

📏 Linting

Check code quality with ESLint:

npm run lint


## 📬 API Endpoints

Below are the main API endpoints for the EduTech backend:

### 🔑 Auth
| Method | Endpoint        | Description         | Access  |
|--------|----------------|---------------------|---------|
| POST   | `/api/auth/login`  | Login with credentials | Public  |
| POST   | `/api/auth/logout` | Logout user            | Authenticated |

---

### 👤 User
| Method | Endpoint        | Description          | Access |
|--------|----------------|----------------------|--------|
| POST   | `/api/user/register` | Register new user | Public |
| GET    | `/api/user/me`       | Get logged-in profile | Authenticated |
| PATCH  | `/api/user/update`   | Update user info   | Authenticated |

---

### 📚 Courses
| Method | Endpoint         | Description         | Access |
|--------|-----------------|---------------------|--------|
| POST   | `/api/course/create` | Create a new course | Admin |
| GET    | `/api/course`        | Get all courses     | Public |
| GET    | `/api/course/:id`    | Get single course   | Public |

---

### 📖 Books
| Method | Endpoint          | Description         | Access |
|--------|------------------|---------------------|--------|
| POST   | `/api/book/create` | Create a new book   | Admin |
| GET    | `/api/book`        | Get all books       | Public |
| GET    | `/api/book/:id`    | Get single book     | Public |

---

### 🛒 Book Cart
| Method | Endpoint                 | Description             | Access |
|--------|-------------------------|-------------------------|--------|
| POST   | `/api/cart/book/add`     | Add a book to cart      | Authenticated |
| GET    | `/api/cart/book/me`      | Get my book cart        | Authenticated |
| DELETE | `/api/cart/book/remove/:bookId` | Remove book from cart | Authenticated |
| PATCH  | `/api/cart/book/update`  | Update book quantity    | Authenticated |

---

### 🎓 Course Cart
| Method | Endpoint                     | Description             | Access |
|--------|-----------------------------|-------------------------|--------|
| POST   | `/api/cart/course/add`       | Add a course to cart    | Authenticated |
| GET    | `/api/cart/course/me`        | Get my course cart      | Authenticated |
| DELETE | `/api/cart/course/remove/:courseId` | Remove course from cart | Authenticated |

---
