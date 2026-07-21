require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

// Force Google DNS — fixes querySrv ECONNREFUSED on Windows
require("dns").setDefaultResultOrder("ipv4first");
require("dns").setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../MODELS/listing.js");

const MONGO_URL = process.env.ATLASDB_URI || "mongodb://127.0.0.1:27017/prestigestay";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL, {
        tls: true,
        tlsAllowInvalidCertificates: false,
    });
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: '6a532f68bab19783a0133cc7' }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
    process.exit(0);
};

initDB();