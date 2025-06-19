# SkillReclaim Backend

SkillReclaim is an authentication API built to support people in regaining relevant skills and accessing new career opportunities in a world impacted by automation and AI.

## 🚀 Features

- ✅ User Signup (with hashed passwords)
- ✅ User Login (with JWT authentication)
- ✅ Protected route with token-based access
- ✅ CORS support for frontend integration

## 🛠 Built With

- **Node.js**
- **Express.js**
- **bcryptjs**
- **jsonwebtoken**
- **cors**

## 📦 How to Run Locally

```bash
npm install
npm start


```


The server will start on:

http://localhost:3000

## 📡 API Endpoints
```
POST   /signup       # Register a new user
POST   /login        # Authenticate and get JWT token
GET    /dashboard    # Protected route (requires Authorization header)
```

## 🔐 Environment (Optional)

In a real app, secrets like the JWT key should be stored in a .env file:
```bash
JWT_SECRET=your_super_secret_key
```
(Currently hardcoded in index.js for simplicity.)

Created by PealdanTech – 2025
Powered by 💡 for SkillReclaim
