const mongoose = require("mongoose");
const reviews = require("./reviews");
const user = require("./user");
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
            default: "Shree Nakodaji",
        },
        url: {
            type: String,
            default: "https://imgs.search.brave.com/d0ySc_qaifu279Xc-7B5zVTHILN2SQwW6BDTybE0Iv8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8wLzA3L0th/bHBlc2glMkNOYWtv/ZGFfVGlyYXRoXzIw/MDcuSlBHLzUxMnB4/LUthbHBlc2glMkNO/YWtvZGFfVGlyYXRo/XzIwMDcuSlBH",
            set: (v) =>
                v === ""
                    ? "https://imgs.search.brave.com/d0ySc_qaifu279Xc-7B5zVTHILN2SQwW6BDTybE0Iv8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8wLzA3L0th/bHBlc2glMkNOYWtv/ZGFfVGlyYXRoXzIw/MDcuSlBHLzUxMnB4/LUthbHBlc2glMkNO/YWtvZGFfVGlyYXRo/XzIwMDcuSlBH"
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
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {

    console.log("Yash", listing);
    if (listing.reviews.length) {
        let data = await reviews.deleteMany({ _id: { $in: listing.reviews } })
        console.log(data);
    }

})
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;