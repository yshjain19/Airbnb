const Listing = require("../MODELS/listing.js");

module.exports.index = async (req, res) => {
    const alllistings = await Listing.find({});
    res.render("listings/index", { alllistings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const data = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");

    if (!data) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show", { data });
};

module.exports.createListing = async (req, res) => {
    console.log(req.file);
    const { title, description, price, country, location, image } = req.body;

    const uploadedImage = req.file
        ? {
            filename: req.file.filename,
            url: req.file.path || req.file.secure_url || req.file.url || "",
        }
        : image
            ? {
                filename: image.filename || "default-image",
                url: image.path || image.url || image,
            }
            : {
                filename: "default-image",
                url: "",
            };

    const sample = new Listing({
        title,
        description,
        image: uploadedImage,
        price,
        location,
        country,
        owner: req.user._id,
    });

    await sample.save();
    req.flash("success", "New post added successfully");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const post = await Listing.findById(id);
    if (!post) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }
    let originalImage = post.image.url ;
    originalImage = originalImage.replace("/uploads", "/uploads/w_350,h_100,c_limit");
    res.render("listings/edit", { post, originalImage });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, country, location, image } = req.body;
    const existingListing = await Listing.findById(id);

    if (!existingListing) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }

    const imageData = req.file
        ? {
            filename: req.file.filename,
            url: req.file.path || req.file.secure_url || req.file.url,
        }
        : image
            ? {
                filename: existingListing.image?.filename || "default-image",
                url: image,
            }
            : existingListing.image;

    await Listing.findByIdAndUpdate(id, {
        title,
        description,
        image: imageData,
        price,
        country,
        location,
    });
    req.flash("success", "Post updated successfully");
    res.redirect("/listings");
};

module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("Delet", "Post Deleted sucessfully");
    res.redirect("/listings");
};
