# 🧭 Wandr – Full-Stack Travel Stay Platform

A feature-rich, full-stack web app for booking, reviewing, and managing travel stays—built with Node.js, Express, MongoDB, EJS, Cloudinary, and Mapbox.

> **Live site:** https://wandr-eu3b.onrender.com

---

## 📚 Overview

Wandr lets users browse listings, view locations on a map, create accounts, upload property images, read and leave reviews, and search for stays using filters — all in a clean and responsive UI.

---

## 🚩 Features

- 🏡 **Listings** — Create, edit, and delete stays with Cloudinary image uploads  
- ⭐ **Reviews** — Add/delete ratings & comments with full validation  
- 🔐 **Auth System** — Signup/login using Passport.js sessions  
- 🗺️ **Map Integration** — Mapbox SDK for geocoding + interactive maps  
- 🔎 **Search & Filters** — Lightweight search system for listings  
- 📱 **Responsive UI** — Bootstrap 5 + custom CSS  
- 🧼 **Input Validation** — Joi schemas for all forms  
- 🗂️ **Clean Folder Architecture**  
- ☁️ **Cloudinary CDN** for images  

---

## 🛠️ Tech Stack

### **Backend**
- Node.js (v22)
- Express.js
- MongoDB Atlas + Mongoose
- Passport.js (local strategy)
- Multer + Cloudinary Storage
- Joi Validation
- Mapbox SDK

### **Frontend**
- EJS + EJS-Mate (templating)
- Bootstrap 5
- Font Awesome
- Custom CSS

### **DevOps**
- Render (hosting)
- Dotenv (env variables)
- Cloudinary (image upload)
- Mapbox (geocoding/maps)

---

## 📁 Project Structure

```plaintext
Wandr/
│
├── controllers/            # Route controllers (listings, reviews, auth)
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── models/                 # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/                 # Express routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── utils/                  # Utility modules (error handling, wrapAsync, etc.)
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── views/                  # EJS templates
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
│
├── public/                 # Static assets
│   ├── css/
│   ├── js/
│   └── icon/
│
├── cloudConfig.js          # Cloudinary config
├── middlewares.js          # Authentication / authorization / validation
├── schema.js               # Joi schemas
├── app.js                  # Main server entry
├── package.json
└── README.md
```

---

## 📦 Installation & Setup

### **1️⃣ Clone Repo**
```bash
git clone https://github.com/DkshLuvsDucks/wandr-airbnb-clone.git
cd wandr-airbnb-clone
```

###  **2️⃣ Install Dependencies**
```bash
npm install
```

###  **3️⃣ Configure Environment**

Create a `.env` file in the root directory:
```bash
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_token

ATLAS_DB_URL=your_mongodb_atlas_url
SECRET=your_session_secret
```

### **4️⃣ Run Server**
```bash
node app.js
```

Local: [http://localhost:8080](http://localhost:8080)

---

## 🚀 Deployment

- Hosted on Render: [wandr-eu3b.onrender.com](https://wandr-eu3b.onrender.com)
- Env variables are set in Render dashboard.

---

## 🌐 External APIs

- **Cloudinary:** For user photo uploads, on-the-fly optimization.
- **Mapbox:** Geocoding addresses and rendering interactive maps on listing pages.

---

## 🧭 Planned Improvements

- Wishlist (save listings)
- User dashboards
- Booking system and payments
- Messaging system
- Advanced filters (e.g., price, amenities)
- Improved search with live autocomplete

---

## 👤 Author

Daksh Tongaria  
[GitHub Profile](https://github.com/DkshLuvsDucks)

---
