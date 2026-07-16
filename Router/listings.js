const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isloggidn, isOwner, validateListing } = require("../middleware.js");
const listingsController = require("../Controllers/listings.js");
const multer = require("multer");
const upload = multer({ dest: "public/images" });

// ===================== LISTINGS COLLECTION =====================
router.route("/")
  .get(wrapAsync(listingsController.index))
  .post(isloggidn, validateListing, upload.single("image"), wrapAsync(listingsController.createListing));

// ===================== SHOW NEW LISTING FORM =====================
router.get("/new", isloggidn, listingsController.renderNewForm);

// ===================== INDIVIDUAL LISTING =====================
router.route("/:id")
  .get(wrapAsync(listingsController.showListing))
  .put(isloggidn, isOwner, validateListing, upload.single("image"), wrapAsync(listingsController.updateListing))
  .delete(isloggidn, isOwner, wrapAsync(listingsController.deleteListing));

// ===================== SHOW EDIT FORM =====================
router.get("/:id/edit", isloggidn, isOwner, wrapAsync(listingsController.renderEditForm));

module.exports = router;