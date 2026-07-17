const path = require("path");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: path.resolve(__dirname, ".env") });
}

const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Yash",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

module.exports = { storage, cloudinary };