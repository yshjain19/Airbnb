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
    const { title, description, image, price, country, location } = req.body;
    const sample = new Listing({
        title,
        description,
        price,
        location,
        country,
        owner: req.user._id,
    });

    await sample.save();
    req.flash("success", "New post add sucessfully");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const post = await Listing.findById(id);
    if (!post) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit", { post });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const { title, description, image, price, country, location } = req.body;
    await Listing.findByIdAndUpdate(id, {
        title,
        description,
        image: { url: image },
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
