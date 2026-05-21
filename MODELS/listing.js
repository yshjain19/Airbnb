const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    image: {
        filename: {
            type: String,
            default: "listingimage",
        },
        url: {
            type: String,
            default: "https://uc.orez.io/w/files/e228aa2d3a424b00a059a4840de6df34",
            set: (v) =>
                v === ""
                    ? "https://uc.orez.io/w/files/e228aa2d3a424b00a059a4840de6df34"
                    : v,
        },
    },

    price: {
        type: Number,
        required: true
    },

    location: {
        type: String,
    },

    country: {
        type: String,
    },
});
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;