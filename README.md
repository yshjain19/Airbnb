# 🏡 PrestigeStay

**PrestigeStay** is a full-stack vacation rental and property booking web application inspired by Airbnb. It allows users to explore, create, manage, and review property listings through a secure and responsive platform.

---

## 🚀 Live Demo

🌐 **Website:** https://prestigestay.onrender.com/listings

---

## ✨ Features

* 🔐 User Authentication (Sign Up, Login & Logout)
* 🏠 Browse all property listings
* ➕ Create new property listings
* ✏️ Edit existing listings
* 🗑️ Delete listings
* ☁️ Upload listing images with Cloudinary
* ⭐ Add ratings and reviews
* ❌ Delete reviews
* 📱 Fully responsive UI using Bootstrap
* 🔒 Authorization to protect user actions
* 💬 Flash messages for user feedback
* 🗄️ MongoDB database integration
* 🧩 MVC architecture for clean project structure

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* Bootstrap 5
* EJS (Embedded JavaScript Templates)

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* Passport.js
* Passport Local
* Passport Local Mongoose
* Express Session

### Cloud & File Upload

* Cloudinary
* Multer
* Multer Storage Cloudinary

### Other Tools & Libraries

* Joi (Validation)
* Method Override
* Connect Flash
* Dotenv
* Express EJS Layouts (EJS-Mate)

---

## 📂 Project Structure

```text
PrestigeStay/
│── models/
│── routes/
│── controllers/
│── views/
│── public/
│── middleware/
│── utils/
│── cloudConfig.js
│── app.js
│── package.json
```

---

## ⚙️ Installation

1. Clone the repository

```bash
git clone https://github.com/yshjain19/Airbnb.git
```

2. Navigate to the project folder

```bash
cd Airbnb
```

3. Install dependencies

```bash
npm install
```

4. Create a `.env` file and add the required environment variables.

```env
ATLASDB_URI=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

5. Start the application

```bash
npm start
```

6. Open your browser

```
http://localhost:3000/listings
```

---

## 🔮 Future Improvements

* 🔍 Advanced search and filtering
* ❤️ Wishlist / Favorites
* 📍 Interactive maps
* 💳 Online payment integration
* 📅 Booking availability calendar
* 📧 Email notifications
* 🔔 Real-time notifications

---

## 👨‍💻 Author

**Yash Jain**

* GitHub: https://github.com/yshjain19
* LinkedIn: https://www.linkedin.com/in/yash-jain-6b6647320 

---

## 📄 License

This project is developed for educational and learning purposes.
